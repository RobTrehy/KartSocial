<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title inertia>{{ config('app.name', 'Kart Social') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=audiowide:400|figtree:400,500,600&display=swap" rel="stylesheet" />

  <!-- App Icons and Manifests -->
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png">
  <link rel="manifest" href="/icons/site.webmanifest">
  <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5">
  <link rel="shortcut icon" href="/icons/favicon.ico">
  <meta name="apple-mobile-web-app-title" content="Kart Social">
  <meta name="application-name" content="Kart Social">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="msapplication-config" content="/icons/browserconfig.xml">
  <meta name="theme-color" content="#ffffff">

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite('resources/js/app.tsx')
  @inertiaHead
</head>

<body class="font-sans antialiased">
  @inertia
</body>

</html>