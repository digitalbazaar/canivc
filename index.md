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

<div class="ui two column stackable grid">
  <div class="column">
    {%
      include "components/ScoreList.html"
        listTitle: "Issuer Scores"
        buttonText: "View the scoreboard"
        itemList: companyResultsByTestType.Issuer
    %}
  </div>
  <div class="column">
    {%
      include "components/ScoreList.html"
        listTitle: "Verifier Scores"
        buttonText: "View the scoreboard"
        itemList: companyResultsByTestType.Verifier
    %}
  </div>
</div>

<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/TestSuiteList.html" %}
  </div>
</div>
