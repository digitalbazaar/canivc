---
showHero: true
---
<div style="text-align: center; margin-bottom: 1em;">
  <h5 class="ui header text red">This is an alpha site and subject to iterative updates.</h5>
</div>

<div class="ui one column grid">
  <div class="column">
    <div id="gradient-title" class="ui very padded segment centered grid" style="border: none;">
      <div class="row">
        <span class="ui huge red text" style="color: white">
          {{ site.title }}
        </span>
      </div>
      <div class="row">
        <span class="ui large text" style="color: white">
          <i>{{ site.description }}</i>
        </span>
      </div>
    </div>
  </div>
</div>

<div class="ui two column stackable grid">
  <div class="stretched row">
    <div class="column">
      <div class="ui very padded segment">
        <h2>VC WG Test Suites</h2>
        <div class="ui bulleted list">
            {%- assign wg_specs = results.specsByGroup | where: 'group', 'w3c' -%}
          {%- for report in wg_specs -%}
          <div class="item">
            <a href="/reports/{{ report.shortName | slugify }}">
              {{ report.title }}
            </a>
          </div>
          {%- endfor -%}
        </div>
      </div>
    </div>
    <div class="column">
      <div class="ui very padded segment">
        <h2>CCG Test Suites</h2>
        <div class="ui bulleted list">
        {%- assign wg_specs = results.specsByGroup | where: 'group', 'w3c-ccg' -%}
        {%- for report in wg_specs -%}
          <div class="item">
            <a href="/reports/{{ report.shortName | slugify }}">
              {{ report.title }}
            </a>
          </div>
          {%- endfor -%}
        </div>
      </div>
    </div>
  </div>
    <div class="column">
      {%- include "components/ScoreList.html"
        limit: 5
        buttonLink: "/issuers"
        listTitle: "Issuers"
        buttonText: "View all"
        itemList: results.companiesByTestType.Issuer -%}
    </div>
    <div class="column">
      {%- include "components/ScoreList.html"
        limit: 5
        buttonLink: "/verifiers"
        listTitle: "Verifiers"
        buttonText: "View all"
        itemList: results.companiesByTestType.Verifier -%}
    </div>
</div>

<!--
<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/TestSuiteList.html" %}
  </div>
</div>
-->
<style>
#gradient-title {
  background: rgb(33,133,208);
  background: linear-gradient(130deg, rgba(33,133,208,1) 0%, rgba(33,133,208,0.5) 100%); 
}
</style>