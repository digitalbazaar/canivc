---
title: Issuers
---
<div class="ui one column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 1000
        listTitle: "All Issuer Scores"
        tooltip: "Sorted by most tests passed"
        itemList: results.companiesByTestType.Issuer
    %}
  </div>
</div>
