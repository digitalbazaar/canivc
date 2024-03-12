---
title: Verifiers
---
<div class="ui one column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 1000
        listTitle: "All Verifier Scores"
        tooltip: "Sorted by most tests passed"
        itemList: results.companiesByTestType.Verifier
    %}
  </div>
</div>
