---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 4
cv_pdf: CV_Zhihao_geoscience.pdf
description: Climate & Energy Data Scientist (Applied Scientist: data-to-decision)
---

{% assign cv_pdf_url = page.cv_pdf | prepend: 'assets/pdf/' | relative_url %}

This page embeds my CV PDF for reliable viewing.

<div class="mb-3">
  <a class="btn btn-primary mr-2 mb-2" href="{{ cv_pdf_url }}" target="_blank" rel="noopener noreferrer">Open PDF</a>
  <a class="btn btn-outline-primary mb-2" href="{{ cv_pdf_url }}" download>Download PDF</a>
</div>

<div style="position:relative;width:100%;padding-top:141.4%;border:1px solid var(--global-divider-color);border-radius:12px;overflow:hidden;">
  <iframe
    src="{{ cv_pdf_url }}"
    title="CV PDF"
    style="position:absolute;inset:0;width:100%;height:100%;border:0;"
    loading="lazy">
  </iframe>
</div>

<p class="mt-3">
  If the embed doesn't load, please <a href="{{ cv_pdf_url }}" target="_blank" rel="noopener noreferrer">open the PDF in a new tab</a>.
</p>
