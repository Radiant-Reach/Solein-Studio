<?php
/**
 * Soleil Studio — ACF field groups, custom post types & options page.
 *
 * This file mirrors the data shape already defined by each page's
 * `useFormatQueryData` hook in the Gatsby frontend
 * (src/hooks/useFormatQueryData/*.tsx). See CLAUDE.md → "ACF & WordPress
 * Content Principles" for the conventions this file follows (CPT vs.
 * repeater vs. options page, naming, GraphQL exposure, etc.).
 *
 * Headless setup: WordPress is a content source only (gatsby-source-wordpress
 * + WPGraphQL + WPGraphQL for ACF). Nothing here renders a public-facing
 * page — the virtual page templates registered below exist purely so
 * editors can pick "which page this is" in wp-admin.
 *
 * Pages to create in wp-admin, with the matching template assigned under
 * Page Attributes → Template (Gatsby route on the right for reference —
 * the slug below is what a future GraphQL query will filter on, so it
 * must match):
 *
 *   Title                     | Slug         | Template                  | Gatsby route
 *   --------------------------|--------------|---------------------------|--------------------
 *   Strona główna             | —            | Strona główna             | /
 *     (set as the site's front page under Settings → Reading instead of
 *     relying on its slug — the template assignment still applies)
 *   Cennik                    | cennik       | Cennik                    | /cennik
 *   FAQ                       | faq          | FAQ                       | /faq
 *   Galeria                   | galeria      | Galeria                   | /galeria
 *   Kontakt                   | kontakt      | Kontakt                   | /kontakt
 *   Nasze sale                | nasze-sale   | Nasze sale (lista)        | /nasze-sale
 *   Wydarzenia                | wydarzenia   | Wydarzenia (kalendarz)    | /wydarzenia
 *   Rezerwacja                | rezerwacja   | Rezerwacja                | /rezerwacja
 *   Soleil Collective         | soleil-collective | Soleil Collective    | /wydarzenia/soleil-collective
 *
 * Plus content entries (not Pages — these use their own post types/options):
 *   - Ustawienia Globalne → fill in directly, no page needed (top-level
 *     admin menu item).
 *   - Sale (CPT) → create "Sala Wschód" and "Sala Zachód".
 *   - Wydarzenia (CPT) → one post per event, each tagged with a "Typ
 *     wydarzenia" term (Zewnętrzne / Solein).
 *   - Lokalizacje (CPT) → one post per city/location (e.g. "Wrocław",
 *     matching /lokacje/wroclaw). No Page needed for this anymore — it
 *     replaced the old page-level "Lokalizacja — Wrocław" template.
 *   - Możliwości wydarzeń (CPT) → one post per repeatable occasion/event-type
 *     page (e.g. "Urodziny", "Wesele", "Sesja zdjęciowa") — each post is a
 *     full page (eyebrow/heading/lead/zdjęcia/karty możliwości/CTA), not a
 *     single card. No Page needed for this anymore either — it replaced
 *     the old page-level "Urodziny" template.
 */

defined('ABSPATH') || exit;

$client     = 'soleil-studio';
$client_key = str_replace('-', '_', $client); // soleil_studio

// WordPress hard-caps registered post type names at 20 characters and
// taxonomy names at 32 — "{$client_key}_wydarzenie" alone is already 24,
// so CPTs/taxonomy get their own short prefix instead of the full
// $client_key (which is still used for the options page and field group
// GraphQL names, neither of which has that length limit).
$cpt_wydarzenie     = 'ssx_wydarzenie';     // 14 chars
$cpt_sala           = 'ssx_sala';           // 8 chars
$cpt_mozliwosc      = 'ssx_mozliwosc';      // 13 chars
$cpt_lokalizacja    = 'ssx_lokalizacja';    // 15 chars
$tax_wydarzenie_typ = 'ssx_wydarzenie_typ'; // 18 chars

/* ---------------------------------------------------------------------------
 * Helpers
 * ------------------------------------------------------------------------ */

/**
 * Repeater field for a pricing table ({label, price, highlight} rows), the
 * shape shared by every price list in the project (room rate card, studio
 * rate card, cennik plans).
 */
function ssx_pricing_rows_field($key_prefix, $name, $label, $button_label = 'Dodaj wiersz')
{
    return array(
        'key'          => "{$key_prefix}_{$name}",
        'label'        => $label,
        'name'         => $name,
        'type'         => 'repeater',
        'layout'       => 'table',
        'button_label' => $button_label,
        'sub_fields'   => array(
            array(
                'key'   => "{$key_prefix}_{$name}_label",
                'label' => 'Etykieta',
                'name'  => 'label',
                'type'  => 'text',
            ),
            array(
                'key'   => "{$key_prefix}_{$name}_price",
                'label' => 'Cena',
                'name'  => 'price',
                'type'  => 'text',
            ),
            array(
                'key'   => "{$key_prefix}_{$name}_highlight",
                'label' => 'Wyróżniony wiersz',
                'name'  => 'highlight',
                'type'  => 'true_false',
                'ui'    => 1,
            ),
        ),
    );
}

/**
 * A single ACF "link" field — bundles {title, url, target} in one value.
 * Replaces the old cta_label (text) + cta_url (page_link/url) field pair:
 * one field type now covers internal pages and external URLs alike,
 * instead of switching between page_link and url depending on the target.
 */
function ssx_cta_link_field($key_prefix, $name = 'cta', $label = 'Przycisk CTA')
{
    return array(
        'key'   => "{$key_prefix}_{$name}",
        'label' => $label,
        'name'  => $name,
        'type'  => 'link',
    );
}

/**
 * Heading + text + CTA — the shape every <CtaBanner> molecule consumes.
 * Reused on FAQ, Urodziny and Home.
 */
function ssx_cta_banner_fields($key_prefix)
{
    return array(
        array(
            'key'   => "{$key_prefix}_heading",
            'label' => 'Nagłówek',
            'name'  => 'heading',
            'type'  => 'text',
        ),
        array(
            'key'   => "{$key_prefix}_text",
            'label' => 'Treść',
            'name'  => 'text',
            'type'  => 'textarea',
            'rows'  => 2,
        ),
        ssx_cta_link_field($key_prefix),
    );
}

/**
 * The <StudioIntro> organism's full field shape — identical content model
 * on the Home page ("Lokalizacja" section) and the standalone Wrocław page,
 * exactly like `StudioIntroProps` is shared by both hooks in the frontend.
 */
function ssx_studio_intro_fields($key_prefix)
{
    return array(
        array(
            'key'   => "{$key_prefix}_eyebrow",
            'label' => 'Eyebrow',
            'name'  => 'eyebrow',
            'type'  => 'text',
        ),
        array(
            'key'   => "{$key_prefix}_heading",
            'label' => 'Nagłówek',
            'name'  => 'heading',
            'type'  => 'text',
        ),
        array(
            'key'   => "{$key_prefix}_lead",
            'label' => 'Lead',
            'name'  => 'lead',
            'type'  => 'textarea',
            'rows'  => 2,
        ),
        array(
            'key'          => "{$key_prefix}_paragraphs",
            'label'        => 'Paragrafy',
            'name'         => 'paragraphs',
            'type'         => 'repeater',
            'layout'       => 'block',
            'button_label' => 'Dodaj paragraf',
            'sub_fields'   => array(
                array(
                    'key'   => "{$key_prefix}_paragraphs_text",
                    'label' => 'Treść',
                    'name'  => 'text',
                    'type'  => 'textarea',
                    'rows'  => 3,
                ),
            ),
        ),
        array(
            'key'            => "{$key_prefix}_hero_photos",
            'label'          => 'Zdjęcia',
            'name'           => 'hero_photos',
            'type'           => 'gallery',
            'return_format'  => 'id',
            'preview_size'   => 'medium',
        ),
        array(
            'key'          => "{$key_prefix}_features",
            'label'        => 'Wyróżnione cechy',
            'name'         => 'features',
            'type'         => 'repeater',
            'layout'       => 'block',
            'button_label' => 'Dodaj cechę',
            'sub_fields'   => array(
                array(
                    'key'   => "{$key_prefix}_features_eyebrow",
                    'label' => 'Eyebrow',
                    'name'  => 'eyebrow',
                    'type'  => 'text',
                ),
                array(
                    'key'   => "{$key_prefix}_features_heading",
                    'label' => 'Nagłówek',
                    'name'  => 'heading',
                    'type'  => 'text',
                ),
                array(
                    'key'   => "{$key_prefix}_features_body",
                    'label' => 'Treść',
                    'name'  => 'body',
                    'type'  => 'textarea',
                    'rows'  => 3,
                ),
                array(
                    'key'           => "{$key_prefix}_features_photo",
                    'label'         => 'Zdjęcie',
                    'name'          => 'photo',
                    'type'          => 'image',
                    'return_format' => 'id',
                    'preview_size'  => 'medium',
                ),
            ),
        ),
        array(
            'key'   => "{$key_prefix}_cta_text",
            'label' => 'Tekst nad przyciskiem CTA',
            'name'  => 'cta_text',
            'type'  => 'text',
        ),
        ssx_cta_link_field($key_prefix, 'cta', 'Przycisk CTA'),
    );
}

/* ---------------------------------------------------------------------------
 * Options page — site-wide facts with no detail page of their own.
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($client_key) {
    if (!function_exists('acf_add_options_page')) return;

    acf_add_options_page(array(
        'page_title'         => 'Ustawienia Globalne',
        'menu_title'         => 'Ustawienia Globalne',
        'menu_slug'          => "{$client_key}_theme-general-settings",
        'capability'         => 'edit_posts',
        'redirect'           => false,
        'show_in_graphql'    => true,
        'graphql_field_name' => 'ustawieniaGlobalne',
    ));
});

/* ---------------------------------------------------------------------------
 * Custom post types & taxonomy
 *
 * Registered on the standard `init` hook, not `acf/init` — CPTs/taxonomies
 * are a WordPress core feature and must not depend on ACF being active.
 * `acf/init` is reserved below for the field groups, which genuinely do
 * need ACF.
 * ------------------------------------------------------------------------ */

add_action('init', function () use ($cpt_wydarzenie, $cpt_sala, $cpt_mozliwosc, $cpt_lokalizacja, $tax_wydarzenie_typ) {
    register_post_type($cpt_wydarzenie, array(
        'labels' => array(
            'name'               => 'Wydarzenia',
            'singular_name'      => 'Wydarzenie',
            'add_new'            => 'Dodaj nowe',
            'add_new_item'       => 'Dodaj nowe wydarzenie',
            'edit_item'          => 'Edytuj wydarzenie',
            'new_item'           => 'Nowe wydarzenie',
            'view_item'          => 'Zobacz wydarzenie',
            'search_items'       => 'Szukaj wydarzeń',
            'not_found'          => 'Nie znaleziono wydarzeń',
            'not_found_in_trash' => 'Nie znaleziono wydarzeń w koszu',
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => array(
            'slug'       => 'wydarzenia',
            'with_front' => false,
        ),
        'supports'            => array('title', 'thumbnail', 'custom-fields', 'editor'),
        'menu_icon'           => 'dashicons-calendar-alt',
        'show_in_graphql'     => true,
        'graphql_single_name' => 'Wydarzenie',
        'graphql_plural_name' => 'Wydarzenia',
    ));

    register_post_type($cpt_sala, array(
        'labels' => array(
            'name'               => 'Sale',
            'singular_name'      => 'Sala',
            'add_new'            => 'Dodaj nową',
            'add_new_item'       => 'Dodaj nową salę',
            'edit_item'          => 'Edytuj salę',
            'new_item'           => 'Nowa sala',
            'view_item'          => 'Zobacz salę',
            'search_items'       => 'Szukaj sal',
            'not_found'          => 'Nie znaleziono sal',
            'not_found_in_trash' => 'Nie znaleziono sal w koszu',
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => array(
            'slug'       => 'sale',
            'with_front' => false,
        ),
        'supports'            => array('title', 'thumbnail', 'custom-fields', 'editor'),
        'menu_icon'           => 'dashicons-store',
        'show_in_graphql'     => true,
        'graphql_single_name' => 'Sala',
        'graphql_plural_name' => 'Sale',
    ));

    register_post_type($cpt_mozliwosc, array(
        'labels' => array(
            'name'               => 'Możliwości wydarzeń',
            'singular_name'      => 'Możliwość wydarzenia',
            'add_new'            => 'Dodaj nową',
            'add_new_item'       => 'Dodaj nową możliwość',
            'edit_item'          => 'Edytuj możliwość',
            'new_item'           => 'Nowa możliwość',
            'view_item'          => 'Zobacz możliwość',
            'search_items'       => 'Szukaj możliwości',
            'not_found'          => 'Nie znaleziono możliwości',
            'not_found_in_trash' => 'Nie znaleziono możliwości w koszu',
        ),
        // Each post is a full repeatable page (e.g. "Urodziny", "Wesele",
        // "Sesja zdjęciowa") — same public/has_archive shape as Sala and
        // Lokalizacja, not a small card-only entry.
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => array(
            'slug'       => 'mozliwosci-wydarzen',
            'with_front' => false,
        ),
        'supports'            => array('title', 'thumbnail', 'page-attributes', 'editor'),
        'menu_icon'           => 'dashicons-yes-alt',
        'show_in_graphql'     => true,
        'graphql_single_name' => 'Mozliwosc',
        'graphql_plural_name' => 'Mozliwosci',
    ));

    register_post_type($cpt_lokalizacja, array(
        'labels' => array(
            'name'               => 'Lokalizacje',
            'singular_name'      => 'Lokalizacja',
            'add_new'            => 'Dodaj nową',
            'add_new_item'       => 'Dodaj nową lokalizację',
            'edit_item'          => 'Edytuj lokalizację',
            'new_item'           => 'Nowa lokalizacja',
            'view_item'          => 'Zobacz lokalizację',
            'search_items'       => 'Szukaj lokalizacji',
            'not_found'          => 'Nie znaleziono lokalizacji',
            'not_found_in_trash' => 'Nie znaleziono lokalizacji w koszu',
        ),
        'public'       => true,
        'has_archive'  => true,
        'show_in_rest' => true,
        'rewrite'      => array(
            'slug'       => 'lokalizacje',
            'with_front' => false,
        ),
        'supports'            => array('title', 'thumbnail', 'custom-fields', 'editor'),
        'menu_icon'           => 'dashicons-location-alt',
        'show_in_graphql'     => true,
        'graphql_single_name' => 'Lokalizacja',
        'graphql_plural_name' => 'Lokalizacje',
    ));

    // "Zewnętrzne" / "Solein" — matches the EventCategory union in
    // src/constants/events.ts, modeled as a real taxonomy (rather than a
    // hardcoded select) so editors can manage the labels and so the
    // frontend's category filter list can be queried instead of hardcoded.
    register_taxonomy($tax_wydarzenie_typ, array($cpt_wydarzenie), array(
        'labels' => array(
            'name'          => 'Typy wydarzeń',
            'singular_name' => 'Typ wydarzenia',
            'search_items'  => 'Szukaj typów',
            'all_items'     => 'Wszystkie typy',
            'edit_item'     => 'Edytuj typ',
            'update_item'   => 'Aktualizuj typ',
            'add_new_item'  => 'Dodaj nowy typ',
            'new_item_name' => 'Nowa nazwa typu',
            'menu_name'     => 'Typ wydarzenia',
        ),
        'hierarchical'        => true,
        'public'              => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'WydarzenieTyp',
        'graphql_plural_name' => 'WydarzenieTypy',
    ));
});

/* ---------------------------------------------------------------------------
 * Virtual page templates
 *
 * Headless WP has no real front-end rendering (Gatsby renders every page),
 * so these templates exist only so editors can pick "which page this is" in
 * Page Attributes → Template — the matching ACF field group below keys off
 * that choice via a `page_template` location rule. No real template file
 * backs any of these; nobody ever visits them through WordPress.
 * ------------------------------------------------------------------------ */

add_filter('theme_page_templates', function ($templates) use ($client_key) {
    return $templates + array(
        "{$client_key}-home.php"       => 'Strona główna',
        "{$client_key}-cennik.php"     => 'Cennik',
        "{$client_key}-faq.php"        => 'FAQ',
        "{$client_key}-galeria.php"    => 'Galeria',
        "{$client_key}-kontakt.php"    => 'Kontakt',
        "{$client_key}-nasze-sale.php" => 'Nasze sale (lista)',
        "{$client_key}-wydarzenia.php" => 'Wydarzenia (kalendarz)',
        "{$client_key}-rezerwacja.php" => 'Rezerwacja',
        "{$client_key}-soleil-collective.php" => 'Soleil Collective',
    );
});

/* ---------------------------------------------------------------------------
 * Options page fields
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($client_key) {
    if (!function_exists('acf_add_local_field_group')) return;

    $options_location = array(
        array(
            array(
                'param'    => 'options_page',
                'operator' => '==',
                'value'    => "{$client_key}_theme-general-settings",
            ),
        ),
    );

    acf_add_local_field_group(array(
        'key'                => 'group_ssx_options_kontakt',
        'title'               => 'Dane kontaktowe',
        'graphql_field_name'  => 'kontakt',
        'show_in_graphql'     => true,
        'location'            => $options_location,
        'fields' => array(
            array('key' => 'field_ssx_options_email', 'label' => 'E-mail', 'name' => 'email', 'type' => 'email'),
            array('key' => 'field_ssx_options_phone', 'label' => 'Telefon', 'name' => 'phone', 'type' => 'text'),
            array('key' => 'field_ssx_options_address_line_1', 'label' => 'Adres — linia 1', 'name' => 'address_line_1', 'type' => 'text'),
            array('key' => 'field_ssx_options_address_line_2', 'label' => 'Adres — linia 2', 'name' => 'address_line_2', 'type' => 'text'),
            array('key' => 'field_ssx_options_hours', 'label' => 'Godziny otwarcia', 'name' => 'hours', 'type' => 'text', 'instructions' => 'np. "Pon–Sob, 8:00 – 22:00"'),
            array('key' => 'field_ssx_options_parking_note', 'label' => 'Informacja o parkingu', 'name' => 'parking_note', 'type' => 'text'),
            array('key' => 'field_ssx_options_notification_text', 'label' => 'Pasek powiadomień — treść', 'name' => 'notification_text', 'type' => 'text', 'instructions' => 'Pokazuje się nad nawigacją na każdej stronie, tylko gdy to pole jest wypełnione.'),
            ssx_cta_link_field('field_ssx_options', 'notification_link', 'Pasek powiadomień — link (opcjonalnie)'),
        ),
    ));

    acf_add_local_field_group(array(
        'key'               => 'group_ssx_options_social',
        'title'              => 'Social media',
        'graphql_field_name' => 'socialMedia',
        'show_in_graphql'    => true,
        'location'           => $options_location,
        'fields' => array(
            array(
                'key'          => 'field_ssx_options_social_links',
                'label'        => 'Linki',
                'name'         => 'links',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Dodaj link',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_options_social_links_name', 'label' => 'Nazwa', 'name' => 'name', 'type' => 'text', 'instructions' => 'np. "Facebook", "Instagram"'),
                    array('key' => 'field_ssx_options_social_links_url', 'label' => 'URL', 'name' => 'url', 'type' => 'url'),
                ),
            ),
        ),
    ));

    acf_add_local_field_group(array(
        'key'               => 'group_ssx_options_cennik',
        'title'              => 'Cennik wspólny',
        'graphql_field_name' => 'cennikWspolny',
        'show_in_graphql'    => true,
        'location'           => $options_location,
        'instructions'       => 'Stawki współdzielone przez stronę Cennik i podstrony sal.',
        'fields'             => array(
            ssx_pricing_rows_field('field_ssx_options_cennik', 'pojedyncza_sala', 'Wynajem jednej sali', 'Dodaj stawkę'),
            ssx_pricing_rows_field('field_ssx_options_cennik', 'cale_studio', 'Wynajem całego studia', 'Dodaj stawkę'),
        ),
    ));

    acf_add_local_field_group(array(
        'key'               => 'group_ssx_options_equipment',
        'title'              => 'Wyposażenie studia',
        'graphql_field_name' => 'wyposazenie',
        'show_in_graphql'    => true,
        'location'           => $options_location,
        'instructions'       => 'Lista sprzętu współdzielona przez Cennik i podstrony sal.',
        'fields'             => array(
            array(
                'key'          => 'field_ssx_options_equipment_categories',
                'label'        => 'Kategorie',
                'name'         => 'categories',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj kategorię',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_options_equipment_categories_title', 'label' => 'Nazwa kategorii', 'name' => 'title', 'type' => 'text'),
                    array(
                        'key'          => 'field_ssx_options_equipment_categories_items',
                        'label'        => 'Pozycje',
                        'name'         => 'items',
                        'type'         => 'repeater',
                        'layout'       => 'table',
                        'button_label' => 'Dodaj pozycję',
                        'sub_fields'   => array(
                            array('key' => 'field_ssx_options_equipment_categories_items_text', 'label' => 'Pozycja', 'name' => 'text', 'type' => 'text'),
                        ),
                    ),
                ),
            ),
        ),
    ));

});

/* ---------------------------------------------------------------------------
 * "Wydarzenie" (Event) CPT fields
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($cpt_wydarzenie) {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group(array(
        'key'                => 'group_ssx_wydarzenie',
        'title'              => 'Szczegóły wydarzenia',
        'graphql_field_name' => 'wydarzenieFields',
        'show_in_graphql'    => true,
        'location'           => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => $cpt_wydarzenie,
                ),
            ),
        ),
        'fields' => array(
            array('key' => 'field_ssx_wydarzenie_date', 'label' => 'Data', 'name' => 'date', 'type' => 'date_picker', 'display_format' => 'Y-m-d', 'return_format' => 'Y-m-d'),
            array('key' => 'field_ssx_wydarzenie_time', 'label' => 'Godziny', 'name' => 'time', 'type' => 'text', 'instructions' => 'np. "17:00–19:30"'),
            array('key' => 'field_ssx_wydarzenie_location', 'label' => 'Miejsce', 'name' => 'location', 'type' => 'text', 'default_value' => 'Soleil Studio, Wrocław'),
            array('key' => 'field_ssx_wydarzenie_description', 'label' => 'Krótki opis (lista/kafelek)', 'name' => 'description', 'type' => 'textarea', 'rows' => 2),
            array('key' => 'field_ssx_wydarzenie_long_description', 'label' => 'Pełny opis (strona wydarzenia)', 'name' => 'long_description', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 0),
            array('key' => 'field_ssx_wydarzenie_photo', 'label' => 'Zdjęcie', 'name' => 'photo', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium'),
        ),
    ));
});

/* ---------------------------------------------------------------------------
 * "Sala" (Room) CPT fields
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($cpt_sala) {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group(array(
        'key'                => 'group_ssx_sala',
        'title'              => 'Szczegóły sali',
        'graphql_field_name' => 'salaFields',
        'show_in_graphql'    => true,
        'location'           => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => $cpt_sala,
                ),
            ),
        ),
        'fields' => array(
            array(
                'key'   => 'field_ssx_sala_tab_overview',
                'label' => 'Karta podglądu (strona główna / lista sal)',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_tagline', 'label' => 'Tagline', 'name' => 'tagline', 'type' => 'text', 'instructions' => 'np. "Poranne światło" — używany też jako eyebrow na stronie sali.'),
            array('key' => 'field_ssx_sala_tag_color', 'label' => 'Kolor tagu', 'name' => 'tag_color', 'type' => 'text', 'placeholder' => '#AF3D23', 'instructions' => 'Kolor w formacie hex, np. "#AF3D23".'),
            array('key' => 'field_ssx_sala_capacity_label', 'label' => 'Pojemność (etykieta)', 'name' => 'capacity_label', 'type' => 'text', 'instructions' => 'np. "Do 30 osób"'),
            array('key' => 'field_ssx_sala_short_description', 'label' => 'Krótki opis (kafelek)', 'name' => 'short_description', 'type' => 'textarea', 'rows' => 2),

            array(
                'key'   => 'field_ssx_sala_tab_hero',
                'label' => 'Hero',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_hero_photo', 'label' => 'Zdjęcie główne', 'name' => 'hero_photo', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium', 'instructions' => 'Używane jako zdjęcie hero na stronie sali oraz na kafelku.'),
            array('key' => 'field_ssx_sala_description', 'label' => 'Pełny opis', 'name' => 'description', 'type' => 'wysiwyg', 'toolbar' => 'basic', 'media_upload' => 0),
            array('key' => 'field_ssx_sala_hero_primary_cta', 'label' => 'Przycisk główny', 'name' => 'hero_primary_cta', 'type' => 'link'),
            array('key' => 'field_ssx_sala_hero_secondary_cta', 'label' => 'Przycisk drugi', 'name' => 'hero_secondary_cta', 'type' => 'link'),

            array(
                'key'   => 'field_ssx_sala_tab_gallery',
                'label' => 'Galeria',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_gallery', 'label' => 'Galeria zdjęć', 'name' => 'gallery', 'type' => 'gallery', 'return_format' => 'id', 'preview_size' => 'medium'),

            array(
                'key'   => 'field_ssx_sala_tab_details',
                'label' => 'Szczegóły',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_specs_eyebrow', 'label' => 'Szczegóły — eyebrow', 'name' => 'specs_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_sala_specs_heading', 'label' => 'Szczegóły — nagłówek', 'name' => 'specs_heading', 'type' => 'text'),
            array(
                'key'          => 'field_ssx_sala_specs',
                'label'        => 'Dane sali',
                'name'         => 'specs',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Dodaj wiersz',
                'instructions' => 'np. Pojemność, Powierzchnia, Światło, Minimalny czas',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_sala_specs_label', 'label' => 'Etykieta', 'name' => 'label', 'type' => 'text'),
                    array('key' => 'field_ssx_sala_specs_value', 'label' => 'Wartość', 'name' => 'value', 'type' => 'text'),
                ),
            ),
            array('key' => 'field_ssx_sala_amenities_eyebrow', 'label' => 'W cenie — eyebrow', 'name' => 'amenities_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_sala_amenities_heading', 'label' => 'W cenie — nagłówek', 'name' => 'amenities_heading', 'type' => 'text'),
            array(
                'key'          => 'field_ssx_sala_amenities',
                'label'        => 'W cenie',
                'name'         => 'amenities',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Dodaj pozycję',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_sala_amenities_icon', 'label' => 'Ikona', 'name' => 'icon', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'thumbnail'),
                    array('key' => 'field_ssx_sala_amenities_label', 'label' => 'Etykieta', 'name' => 'label', 'type' => 'text'),
                ),
            ),

            array(
                'key'   => 'field_ssx_sala_tab_pricing',
                'label' => 'Cennik',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_pricing_eyebrow', 'label' => 'Eyebrow', 'name' => 'pricing_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_sala_pricing_heading', 'label' => 'Nagłówek', 'name' => 'pricing_heading', 'type' => 'text'),
            array('key' => 'field_ssx_sala_pricing_lead', 'label' => 'Lead', 'name' => 'pricing_lead', 'type' => 'textarea', 'rows' => 2, 'instructions' => 'Stawki same pochodzą z Ustawień Globalnych → Cennik wspólny — to pole to tylko opis sekcji.'),
            array('key' => 'field_ssx_sala_pricing_primary_cta', 'label' => 'Przycisk główny', 'name' => 'pricing_primary_cta', 'type' => 'link'),
            array('key' => 'field_ssx_sala_pricing_secondary_cta', 'label' => 'Przycisk drugi', 'name' => 'pricing_secondary_cta', 'type' => 'link'),

            array(
                'key'   => 'field_ssx_sala_tab_equipment',
                'label' => 'Wyposażenie',
                'type'  => 'tab',
            ),
            array('key' => 'field_ssx_sala_equipment_eyebrow', 'label' => 'Eyebrow', 'name' => 'equipment_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_sala_equipment_heading', 'label' => 'Nagłówek', 'name' => 'equipment_heading', 'type' => 'text'),
            array('key' => 'field_ssx_sala_equipment_lead', 'label' => 'Lead', 'name' => 'equipment_lead', 'type' => 'textarea', 'rows' => 2, 'instructions' => 'Lista sprzętu pochodzi z Ustawień Globalnych → Wyposażenie studia — to pole to tylko opis sekcji.'),
        ),
    ));
});

/* ---------------------------------------------------------------------------
 * "Możliwość wydarzenia" CPT fields
 *
 * A repeatable occasion/event-type landing page — "Urodziny" is just one
 * example; "Wesele", "Sesja zdjęciowa", "Warsztaty" etc. are each their own
 * post of this same type. Reuses the exact field shape the old page-level
 * "Urodziny" field group used to have, before that page was replaced by
 * this CPT.
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($cpt_mozliwosc) {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group(array(
        'key'                => 'group_ssx_mozliwosc',
        'title'              => 'Szczegóły możliwości wydarzenia',
        'graphql_field_name' => 'mozliwoscFields',
        'show_in_graphql'    => true,
        'location'           => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => $cpt_mozliwosc,
                ),
            ),
        ),
        'fields' => array(
            array('key' => 'field_ssx_mozliwosc_eyebrow', 'label' => 'Eyebrow', 'name' => 'eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_mozliwosc_heading', 'label' => 'Nagłówek', 'name' => 'heading', 'type' => 'text'),
            array('key' => 'field_ssx_mozliwosc_lead', 'label' => 'Lead', 'name' => 'lead', 'type' => 'textarea', 'rows' => 2),
            array('key' => 'field_ssx_mozliwosc_photos', 'label' => 'Zdjęcia', 'name' => 'photos', 'type' => 'gallery', 'return_format' => 'id', 'preview_size' => 'medium'),
            array(
                'key'          => 'field_ssx_mozliwosc_items',
                'label'        => 'Możliwości (karty)',
                'name'         => 'items',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj pozycję',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_mozliwosc_items_title', 'label' => 'Tytuł', 'name' => 'title', 'type' => 'text'),
                    array('key' => 'field_ssx_mozliwosc_items_description', 'label' => 'Opis', 'name' => 'description', 'type' => 'textarea', 'rows' => 2),
                ),
            ),
            // Named "mozliwosc_cta_banner", not bare "cta_banner" — Mozliwosc
            // isn't sharing a GraphQL parent type with Home/FAQ today so this
            // isn't actively broken, but it's the exact same reused-helper
            // shape that broke for them (see the comment on Home's
            // cta_banner field). Renamed for consistency so nobody has to
            // rediscover the bug if Mozliwosc ever ends up sharing a parent
            // type with another group in the future.
            array(
                'key'        => 'field_ssx_mozliwosc_cta_banner',
                'label'      => 'CTA Banner',
                'name'       => 'mozliwosc_cta_banner',
                'type'       => 'group',
                'sub_fields' => ssx_cta_banner_fields('field_ssx_mozliwosc_cta_banner'),
            ),
        ),
    ));
});

/* ---------------------------------------------------------------------------
 * "Lokalizacja" (Location) CPT fields
 *
 * Replaces the old page-level Wrocław field group — each location (e.g.
 * "Wrocław") is now its own post, so adding a second city later means
 * creating a new post, not new code. Reuses the same field shape as
 * Home's embedded "Studio Intro" block.
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($cpt_lokalizacja) {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group(array(
        'key'                => 'group_ssx_lokalizacja',
        'title'              => 'Szczegóły lokalizacji',
        'graphql_field_name' => 'lokalizacjaFields',
        'show_in_graphql'    => true,
        'location'           => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => $cpt_lokalizacja,
                ),
            ),
        ),
        'fields'             => ssx_studio_intro_fields('field_ssx_lokalizacja'),
    ));
});

/* ---------------------------------------------------------------------------
 * Page field groups — one per static route, gated by the virtual page
 * template registered above.
 * ------------------------------------------------------------------------ */

add_action('acf/init', function () use ($client_key) {
    if (!function_exists('acf_add_local_field_group')) return;

    // CRITICAL: every top-level (non-grouped) field's `name` below must be
    // unique across ALL 8 of these page-level field groups — never reuse a
    // bare name like 'eyebrow'/'heading'/'lead'. ACF stores a top-level
    // field's value as plain postmeta keyed by the field's bare `name`,
    // with NO namespacing by which field group it's declared on. Since all
    // 8 groups can be the one matching a given Page post, two groups using
    // the same bare name read/write the exact same postmeta row on that
    // post. Confirmed live: the real "Kontakt" page's `kontaktFields.eyebrow`/
    // `.heading` returned "Nasze sale" / "Dwa wnętrza, jedno słońce" —
    // literally the Nasze Sale page's copy — straight from WPGraphQL, no
    // Gatsby involved. Every field below is now prefixed per page
    // (`faq_eyebrow`, `kontakt_heading`, ...) for exactly this reason —
    // do not revert a name to the bare form even if "no other group uses
    // it right now"; that's exactly the state that broke before.
    //
    // WPGraphQL for ACF infers a field group's GraphQL type from its
    // `location` rules, but only handles a *plain* `post_type` rule —
    // adding `page_template` alongside it (even as an AND condition) made
    // the plugin give up on the mapping entirely (confirmed live). The
    // fix isn't to drop the template condition: `'graphql_types'` lets us
    // declare the GraphQL type explicitly, independent of `location`, so
    // `location` is free to stay precise for wp-admin (each group scoped
    // to its own page via `page_template`) while `graphql_types` always
    // points every one of these 8 groups at `Page`.
    $page_location = function ($template) {
        return array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'page',
                ),
                array(
                    'param'    => 'page_template',
                    'operator' => '==',
                    'value'    => $template,
                ),
            ),
        );
    };
    $page_graphql_types = array('Page');

    /* --- Home ("/") ------------------------------------------------------ */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_home',
        'title'              => 'Strona główna',
        'graphql_field_name' => 'homeFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-home.php"),
        'fields' => array(
            array('key' => 'field_ssx_home_tab_hero', 'label' => 'Hero', 'type' => 'tab'),
            array('key' => 'field_ssx_home_hero_left_photo', 'label' => 'Zdjęcie — lewa strona', 'name' => 'hero_left_photo', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium'),
            array('key' => 'field_ssx_home_hero_right_photo', 'label' => 'Zdjęcie — prawa strona', 'name' => 'hero_right_photo', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium'),
            array('key' => 'field_ssx_home_hero_cta', 'label' => 'Przycisk CTA', 'name' => 'hero_cta', 'type' => 'link'),

            array('key' => 'field_ssx_home_tab_rooms', 'label' => 'Nasze sale', 'type' => 'tab'),
            array('key' => 'field_ssx_home_rooms_eyebrow', 'label' => 'Eyebrow', 'name' => 'rooms_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_home_rooms_heading', 'label' => 'Nagłówek', 'name' => 'rooms_heading', 'type' => 'text', 'instructions' => 'Sale pochodzą z CPT "Sala" — to pole to tylko nagłówek sekcji.'),

            array('key' => 'field_ssx_home_tab_events', 'label' => 'Wydarzenia', 'type' => 'tab'),
            array('key' => 'field_ssx_home_events_eyebrow', 'label' => 'Eyebrow', 'name' => 'events_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_home_events_heading', 'label' => 'Nagłówek', 'name' => 'events_heading', 'type' => 'text'),
            array('key' => 'field_ssx_home_events_lead', 'label' => 'Lead', 'name' => 'events_lead', 'type' => 'textarea', 'rows' => 2),
            array('key' => 'field_ssx_home_events_cta', 'label' => 'Przycisk CTA', 'name' => 'events_cta', 'type' => 'link'),

            array('key' => 'field_ssx_home_tab_studio', 'label' => 'Lokalizacja (Studio Intro)', 'type' => 'tab'),
            array(
                'key'        => 'field_ssx_home_studio_intro',
                'label'      => 'Studio Intro',
                'name'       => 'studio_intro',
                'type'       => 'group',
                'sub_fields' => ssx_studio_intro_fields('field_ssx_home_studio_intro'),
            ),

            array('key' => 'field_ssx_home_tab_gallery', 'label' => 'Galeria', 'type' => 'tab'),
            array('key' => 'field_ssx_home_gallery_eyebrow', 'label' => 'Eyebrow', 'name' => 'gallery_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_home_gallery_heading', 'label' => 'Nagłówek', 'name' => 'gallery_heading', 'type' => 'text'),
            array('key' => 'field_ssx_home_gallery_lead', 'label' => 'Lead', 'name' => 'gallery_lead', 'type' => 'textarea', 'rows' => 2),
            array('key' => 'field_ssx_home_gallery_photos', 'label' => 'Zdjęcia', 'name' => 'gallery_photos', 'type' => 'gallery', 'return_format' => 'id', 'preview_size' => 'medium'),
            array('key' => 'field_ssx_home_gallery_cta', 'label' => 'Przycisk CTA', 'name' => 'gallery_cta', 'type' => 'link'),

            array('key' => 'field_ssx_home_tab_cta_banner', 'label' => 'CTA Banner', 'type' => 'tab'),
            // Named "home_cta_banner", not the generic "cta_banner" the
            // ssx_cta_banner_fields() helper name suggests — homeFields and
            // faqFields both attach to the same GraphQL parent type (Page,
            // via $page_graphql_types) and confirmed live that two sibling
            // field groups on one parent type with an identically named +
            // shaped nested group ("cta_banner" with heading/text/cta on
            // both) makes gatsby-source-wordpress resolve one of them to
            // null (heading/text/cta all null) despite WPGraphQL itself
            // returning real values — the GraphQL type names are already
            // distinct (WpPage_Homefields_CtaBanner vs
            // WpPage_Faqfields_CtaBanner) so this isn't a schema-level
            // collision, but a gatsby-source-wordpress sourcing bug keyed
            // on the shared name+shape. Mozliwosc's identical cta_banner
            // group sources fine because Mozliwosc isn't sharing a parent
            // type with anything else. Give any future reused nested group
            // a unique name the moment its parent groups end up sharing a
            // GraphQL type.
            array(
                'key'        => 'field_ssx_home_cta_banner',
                'label'      => 'CTA Banner',
                'name'       => 'home_cta_banner',
                'type'       => 'group',
                'sub_fields' => ssx_cta_banner_fields('field_ssx_home_cta_banner'),
            ),
        ),
    ));

    /* --- Cennik ----------------------------------------------------------
     * Per-room and per-studio pricing rows live on the options page
     * ("Cennik wspólny") and are reused here, not duplicated. */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_cennik',
        'title'              => 'Cennik',
        'graphql_field_name' => 'cennikFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-cennik.php"),
        'fields' => array(
            array('key' => 'field_ssx_cennik_tab_hero', 'label' => 'Hero', 'type' => 'tab'),
            array('key' => 'field_ssx_cennik_script_label', 'label' => 'Etykieta script', 'name' => 'script_label', 'type' => 'text'),
            array('key' => 'field_ssx_cennik_heading', 'label' => 'Nagłówek', 'name' => 'cennik_heading', 'type' => 'text'),
            array('key' => 'field_ssx_cennik_lead', 'label' => 'Lead', 'name' => 'cennik_lead', 'type' => 'textarea', 'rows' => 2),

            array('key' => 'field_ssx_cennik_tab_addons', 'label' => 'Usługi dodatkowe', 'type' => 'tab'),
            array('key' => 'field_ssx_cennik_addons_heading', 'label' => 'Nagłówek', 'name' => 'addons_heading', 'type' => 'text'),
            array('key' => 'field_ssx_cennik_makeup_title', 'label' => 'Stanowisko do makijażu — nazwa', 'name' => 'makeup_title', 'type' => 'text'),
            array('key' => 'field_ssx_cennik_makeup_price', 'label' => 'Cena', 'name' => 'makeup_price', 'type' => 'text'),
            array('key' => 'field_ssx_cennik_makeup_unit', 'label' => 'Jednostka', 'name' => 'makeup_unit', 'type' => 'text', 'instructions' => 'np. "/h"'),
            array('key' => 'field_ssx_cennik_makeup_note', 'label' => 'Dopisek', 'name' => 'makeup_note', 'type' => 'text', 'instructions' => 'np. "przed sesją"'),
            array('key' => 'field_ssx_cennik_makeup_description', 'label' => 'Opis', 'name' => 'makeup_description', 'type' => 'textarea', 'rows' => 2),
            array(
                'key'          => 'field_ssx_cennik_extra_notes',
                'label'        => 'Dodatkowe uwagi',
                'name'         => 'extra_notes',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj uwagę',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_cennik_extra_notes_text', 'label' => 'Treść', 'name' => 'text', 'type' => 'text'),
                ),
            ),
            array('key' => 'field_ssx_cennik_quote_heading', 'label' => 'Nagłówek wyceny indywidualnej', 'name' => 'quote_heading', 'type' => 'text'),
            array(
                'key'          => 'field_ssx_cennik_quote_items',
                'label'        => 'Pozycje wyceny indywidualnej',
                'name'         => 'quote_items',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj pozycję',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_cennik_quote_items_text', 'label' => 'Treść', 'name' => 'text', 'type' => 'text'),
                ),
            ),
            array('key' => 'field_ssx_cennik_quote_cta', 'label' => 'Przycisk CTA', 'name' => 'quote_cta', 'type' => 'link'),

            array('key' => 'field_ssx_cennik_tab_rules', 'label' => 'Zasady', 'type' => 'tab'),
            array(
                'key'          => 'field_ssx_cennik_rules',
                'label'        => 'Zasady',
                'name'         => 'rules',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj zasadę',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_cennik_rules_text', 'label' => 'Treść', 'name' => 'text', 'type' => 'textarea', 'rows' => 2),
                ),
            ),
            array('key' => 'field_ssx_cennik_notice', 'label' => 'Uwaga wyróżniona', 'name' => 'notice', 'type' => 'text'),
        ),
    ));

    /* --- FAQ --------------------------------------------------------------- */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_faq',
        'title'              => 'FAQ',
        'graphql_field_name' => 'faqFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-faq.php"),
        'fields' => array(
            array('key' => 'field_ssx_faq_eyebrow', 'label' => 'Eyebrow', 'name' => 'faq_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_faq_heading', 'label' => 'Nagłówek', 'name' => 'faq_heading', 'type' => 'text'),
            array('key' => 'field_ssx_faq_lead', 'label' => 'Lead', 'name' => 'faq_lead', 'type' => 'textarea', 'rows' => 2),
            array(
                'key'          => 'field_ssx_faq_items',
                'label'        => 'Pytania',
                'name'         => 'items',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj pytanie',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_faq_items_question', 'label' => 'Pytanie', 'name' => 'question', 'type' => 'text'),
                    array('key' => 'field_ssx_faq_items_answer', 'label' => 'Odpowiedź', 'name' => 'answer', 'type' => 'textarea', 'rows' => 3),
                ),
            ),
            // Named "faq_cta_banner", not "cta_banner" — see the comment on
            // Home's cta_banner field above for why (shared "Page" GraphQL
            // type + identically named/shaped nested group breaks
            // gatsby-source-wordpress's sourcing for one of the two).
            array(
                'key'        => 'field_ssx_faq_cta_banner',
                'label'      => 'CTA Banner',
                'name'       => 'faq_cta_banner',
                'type'       => 'group',
                'sub_fields' => ssx_cta_banner_fields('field_ssx_faq_cta_banner'),
            ),
        ),
    ));

    /* --- Galeria ------------------------------------------------------------ */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_galeria',
        'title'              => 'Galeria',
        'graphql_field_name' => 'galeriaFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-galeria.php"),
        'fields' => array(
            array('key' => 'field_ssx_galeria_eyebrow', 'label' => 'Eyebrow', 'name' => 'galeria_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_galeria_heading', 'label' => 'Nagłówek', 'name' => 'galeria_heading', 'type' => 'text'),
            array('key' => 'field_ssx_galeria_lead', 'label' => 'Lead', 'name' => 'galeria_lead', 'type' => 'textarea', 'rows' => 2),
            array(
                'key'          => 'field_ssx_galeria_filters',
                'label'        => 'Filtry',
                'name'         => 'filters',
                'type'         => 'repeater',
                'layout'       => 'table',
                'button_label' => 'Dodaj filtr',
                'instructions' => 'Wartość "id" musi odpowiadać polu "Kategoria" w zdjęciach poniżej.',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_galeria_filters_id', 'label' => 'ID', 'name' => 'filter_id', 'type' => 'text'),
                    array('key' => 'field_ssx_galeria_filters_label', 'label' => 'Etykieta', 'name' => 'label', 'type' => 'text'),
                ),
            ),
            array(
                'key'          => 'field_ssx_galeria_shots',
                'label'        => 'Zdjęcia',
                'name'         => 'shots',
                'type'         => 'repeater',
                'layout'       => 'block',
                'button_label' => 'Dodaj zdjęcie',
                'sub_fields'   => array(
                    array('key' => 'field_ssx_galeria_shots_photo', 'label' => 'Zdjęcie', 'name' => 'photo', 'type' => 'image', 'return_format' => 'id', 'preview_size' => 'medium'),
                    array('key' => 'field_ssx_galeria_shots_category', 'label' => 'Kategoria', 'name' => 'category', 'type' => 'text', 'instructions' => 'Musi odpowiadać ID jednego z filtrów powyżej.'),
                    array('key' => 'field_ssx_galeria_shots_wide', 'label' => 'Szerokie (2 kolumny)', 'name' => 'span_wide', 'type' => 'true_false', 'ui' => 1),
                    array('key' => 'field_ssx_galeria_shots_tall', 'label' => 'Wysokie (2 wiersze)', 'name' => 'span_tall', 'type' => 'true_false', 'ui' => 1),
                ),
            ),
        ),
    ));

    /* --- Kontakt -------------------------------------------------------------
     * Address/phone/email/hours/parking come from "Ustawienia Globalne". */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_kontakt',
        'title'              => 'Kontakt',
        'graphql_field_name' => 'kontaktFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-kontakt.php"),
        'fields' => array(
            array('key' => 'field_ssx_kontakt_eyebrow', 'label' => 'Eyebrow', 'name' => 'kontakt_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_kontakt_heading', 'label' => 'Nagłówek', 'name' => 'kontakt_heading', 'type' => 'text'),
            array('key' => 'field_ssx_kontakt_lead', 'label' => 'Lead', 'name' => 'kontakt_lead', 'type' => 'textarea', 'rows' => 2),
        ),
    ));

    /* --- Nasze sale (index) --------------------------------------------------
     * The room cards themselves come from the "Sala" CPT. */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_nasze_sale',
        'title'              => 'Nasze sale (lista)',
        'graphql_field_name' => 'naszeSaleFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-nasze-sale.php"),
        'fields' => array(
            array('key' => 'field_ssx_nasze_sale_eyebrow', 'label' => 'Eyebrow', 'name' => 'nasze_sale_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_nasze_sale_heading', 'label' => 'Nagłówek', 'name' => 'nasze_sale_heading', 'type' => 'text'),
        ),
    ));

    /* --- Wydarzenia (kalendarz) ------------------------------------------------
     * Categories come from the WydarzenieTyp taxonomy; events from the
     * "Wydarzenie" CPT. This group is just the section intro copy. */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_wydarzenia',
        'title'              => 'Wydarzenia (kalendarz)',
        'graphql_field_name' => 'wydarzeniaFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-wydarzenia.php"),
        'fields' => array(
            array('key' => 'field_ssx_wydarzenia_eyebrow', 'label' => 'Eyebrow', 'name' => 'wydarzenia_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_wydarzenia_heading', 'label' => 'Nagłówek', 'name' => 'wydarzenia_heading', 'type' => 'text'),
            array('key' => 'field_ssx_wydarzenia_lead', 'label' => 'Lead', 'name' => 'wydarzenia_lead', 'type' => 'textarea', 'rows' => 2),
        ),
    ));

    /* --- Rezerwacja -------------------------------------------------------- */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_rezerwacja',
        'title'              => 'Rezerwacja',
        'graphql_field_name' => 'rezerwacjaFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-rezerwacja.php"),
        'fields' => array(
            array('key' => 'field_ssx_rezerwacja_eyebrow', 'label' => 'Eyebrow', 'name' => 'rezerwacja_eyebrow', 'type' => 'text'),
            array('key' => 'field_ssx_rezerwacja_heading', 'label' => 'Nagłówek', 'name' => 'rezerwacja_heading', 'type' => 'text'),
            array('key' => 'field_ssx_rezerwacja_lead', 'label' => 'Lead', 'name' => 'rezerwacja_lead', 'type' => 'textarea', 'rows' => 2),
        ),
    ));

    /* --- Soleil Collective ---------------------------------------------------
     * For events at the studio not created by Soleil itself — description,
     * vision/mission/"for whom" blocks and photos, reusing the exact same
     * content shape as <StudioIntro> (see ssx_studio_intro_fields() above).
     * The group's "cta" link field doubles as the Instagram link the brief
     * asked for, exactly like every other CTA in this project.
     *
     * Named "collective_intro", not "studio_intro" — this group attaches to
     * the same `Page` GraphQL type as Home's studio_intro (via
     * $page_graphql_types), and a same-name + same-shape nested group on
     * sibling field groups sharing a parent type is the exact pattern that
     * broke gatsby-source-wordpress for Home/FAQ's cta_banner (see the
     * comment above Home's cta_banner field) — give it a unique name up
     * front instead of waiting to hit that bug again. */
    acf_add_local_field_group(array(
        'key'                => 'group_ssx_page_soleil_collective',
        'title'              => 'Soleil Collective',
        'graphql_field_name' => 'soleilCollectiveFields',
        'show_in_graphql'    => true,
        'graphql_types'      => $page_graphql_types,
        'location'           => $page_location("{$client_key}-soleil-collective.php"),
        'fields' => array(
            array(
                'key'        => 'field_ssx_soleil_collective_intro',
                'label'      => 'Treść',
                'name'       => 'collective_intro',
                'type'       => 'group',
                'sub_fields' => ssx_studio_intro_fields('field_ssx_soleil_collective_intro'),
            ),
        ),
    ));
});
