---
pagination:
  data: implementations
  size: 1
  alias: vendor
permalink: "/implementations/{{ vendor | slugify }}/"
---

<textarea>{{ results.all | json: 2 }}</textarea>

{% assign info = implementations[vendor] %}
{% assign testCategories = results.testsByCompany[vendor] %}

<h1 style="text-align: center">{{ vendor }}</h1>

{% for testCategory in testCategories %}
<!-- Only showing issuer and verifier statistics -->
<div class="ui very padded segment">
  <h2 style="border-bottom: 2px solid gray; width: fit-content">
    {{ testCategory[0] }}
  </h2>
  <!-- Spider Chart -->
  <div class="ui one column centered grid">
    <div class="column">
      {% assign chartValues = results.vendorChartData.vendorResults[vendor][testCategory[0]] | getPercentages %}
      {% assign chartLabels = results.vendorChartData.labels[testCategory[0]] %}
      <canvas
        class="spider-chart"
        style="max-height: 400px"
        data-chart-values='{{chartValues}}'
        data-chart-labels='{{chartLabels}}'></canvas>
    </div>
  </div>
  <div class="ui two column grid stackable">
    <div class="column">
      <div class="ui horizontal divider header">
        <span class="ui small grey italic text">Test Count</span>
      </div>
      {% assign issuerResults = results.companiesByTestType[testCategory[0]] | findObjectByProperty: "text", vendor %}
      <div style="display: flex; justify-content: center; margin-bottom: 32px">
      {%- include "components/BarRatingKey.html"
        passed: issuerResults.passed
        pending: issuerResults.pending
        failed: issuerResults.failed
        total: issuerResults.total -%}
      </div>
      <div style="display: flex; justify-content: center">
      {%- BarRating issuerResults.passed issuerResults.pending issuerResults.failed issuerResults.total "100%" -%}
      </div>
    </div>
    <div class="column">
      <div class="ui horizontal divider header">
        <span class="ui small grey italic text">Test Results</span>
      </div>
      {% for link in testCategory[1] -%}
      <a
        style="margin-top: 0.25em"
        class="tiny ui inverted secondary button"
        href="{{link.url}}/{{ link.label | slugify }}">
        {{ link.label }}
      </a>
      {% endfor -%}
    </div>
  </div>
</div>
{% endfor %}

<h3 class="ui header">Specifcations Tested
  {%- if results.implementersOfSpecs[vendor].totals %}
    <span class="sub header" title="Tests Passed / Total Tests">
      {{ results.implementersOfSpecs[vendor].totals.passed }} / {{ results.implementersOfSpecs[vendor].totals.total }}
    </span>
  {% endif -%}
</h3>
<div class="ui stackable grid">
  {%- assign specs = results.implementersOfSpecs[vendor].specs -%}
  {%- for spec in specs -%}
    <div class="row">
      <div class="seven wide column">
        <a class="ui medium header" href="/reports/{{spec.shortName | slugify}}">
          {{ spec.title }}
        </a>
      </div>
      <div class="four wide column">
        {%- BarRating spec.stats.passed spec.stats.pending spec.stats.failed spec.stats.total '100%' -%}
      </div>
      <div class="two wide column">{{ spec.stats.passed }} / {{ spec.stats.total }}</div>
    </div>
  {%- endfor %}
</div>
