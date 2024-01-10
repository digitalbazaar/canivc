<div class="ui one column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 100
        listTitle: "All Issuer Scores"
        itemList: companyResultsByTestType.Issuer
    %}
  </div>
</div>
