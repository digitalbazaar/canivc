---
title: Implementations
---
<div style="display: flex; align-items: center">
  <h2>
    Implementations
  </h2>
  <div data-tooltip="Sorted alphabetically">
    <i class="small info icon grey" style="margin-bottom: 1.5em; margin-left: 0.5em"></i>
  </div>
</div>
<div class="ui bulleted list">
{% assign list = "" %}
{%- for i in implementations -%}
  {% assign list = list | append: i[0] | append: ","  %}
{%- endfor -%}
{% assign names = list | split: "," | sort_natural %}
{%- for name in names -%}
  <div class="item">
    <a href="{{ name | slugify }}">{{ name }}</a>
  </div>
{%- endfor -%}
</div>