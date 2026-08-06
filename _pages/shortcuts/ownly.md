---
layout: null
title: Ownly
permalink: /ownly/
redirect_to: https://liuh886.github.io/ownly/
sitemap: false
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow,noarchive">
    <meta http-equiv="refresh" content="0; url={{ page.redirect_to | escape }}">
    <link rel="canonical" href="{{ page.redirect_to | escape }}">
    <title>Opening {{ page.title | escape }}</title>
    <script>
      window.location.replace({{ page.redirect_to | jsonify }} + window.location.search + window.location.hash);
    </script>
  </head>
  <body>
    <p>Opening <a href="{{ page.redirect_to | escape }}">{{ page.title | escape }}</a>…</p>
  </body>
</html>
