---
showHero: true
---
<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/Search.html" %}
  </div>
</div>

<div 
  v-scope
  v-show="store.searchResults.length"
  class="ui one column stackable grid"
>
  <div class="column">
    {% include "components/SearchResults.html" %}
  </div>
</div>
<!---
<div class="ui two column stackable grid">
{% for items in homePage.blockList %}
  <div class="column">
    {%
      include "components/BlockList.html"
        listTitle: items.listTitle
        itemList: items.listItems
        buttonText: items.buttonText
    %}
  </div>
{% endfor %}
</div>
--->
<div class="ui two column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 5
        buttonLink: "/issuers"
        listTitle: "Top Issuers"
        buttonText: "View the scoreboard"
        itemList: results.companiesByTestType.Issuer
    %}
  </div>
  <div class="column">
    {%
      include "components/ScoreList.html"
        limit: 5
        buttonLink: "/verifiers"
        listTitle: "Top Verifiers"
        buttonText: "View the scoreboard"
        itemList: results.companiesByTestType.Verifier
    %}
  </div>
</div>

<!---
<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/TestSuiteList.html" %}
  </div>
</div>
-->
