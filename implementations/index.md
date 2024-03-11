---
title: Implementations
---

## Implementations

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
