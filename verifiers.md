<div class="ui one column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 100
        listTitle: "All Verifier Scores"
        itemList: companyResultsByTestType.Verifier
    %}
  </div>
</div>
