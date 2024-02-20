---
pagination:
  data: implementations
  size: 1
  alias: vendor
permalink: "/implementations/{{ vendor | slugify }}"
---

{% assign info = implementations[vendor] %}
{% assign testCategories = results.testsByCompany[vendor] %}
<h1 style="text-align: center">{{ vendor }}</h1>

{% for testCategory in testCategories %}
<div class="ui very padded segment">
  <h2 style="border-bottom: 2px solid gray; width: fit-content">
    {{ testCategory[0] }}
  </h2>
  <!-- Test Results -->
  {% assign issuerResults = results.companiesByTestType[testCategory[0]] | findObjectByProperty: "text", vendor %}
  {% BarRating issuerResults.passed issuerResults.pending issuerResults.failed issuerResults.total "100%" %}
  <div class="ui mini horizontal divided list">
    <div class="item">
      <i class="stop icon item teal"></i>
      <div class="content">
        Passing: {{ issuerResults.passed }}
      </div>
    </div>
    <div class="item">
      <i class="stop icon item yellow"></i>
      <div class="content">
        Pending: {{ issuerResults.pending }}
      </div>
    </div>
    <div class="item">
      <i class="stop icon item red"></i>
      <div class="content">
        Failed: {{ issuerResults.failed }}
      </div>
    </div>
    <div class="item">
      <i class="stop icon item grey"></i>
      <div class="content">
        Total: {{ issuerResults.total }}
      </div>
    </div>
  </div>
  <div class="ui horizontal divider header">
    <span class="ui small grey italic text">Test Result Links</span>
  </div>
  <!-- Tags -->
  {% for link in testCategory[1] -%}
  <button
    style="margin-top: 0.25em"
    onclick='location.href="{{link.url}}/{{ link.label | slugify }}"'
    class="tiny ui inverted secondary button">
      {{ link.label }}
  </button>
  {% endfor -%}
</div>
{% endfor %}