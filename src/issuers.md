---
title: Issuers
---
<div class="ui one column stackable grid">
  <div class="column">
    {%- assign passingIssuers = results.companiesByTestType.Issuer | where_exp: "tests", "tests.passed > 0" -%}
    {%
      include "components/ScoreList.html"
        limit: 100
        listTitle: "All Issuer Scores"
        tooltip: "Sorted by most tests passed"
        itemList: passingIssuers
    %}
  </div>
</div>
