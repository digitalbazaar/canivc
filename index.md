---
showHero: true
---
<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/Search.html" %}
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
{% for items in homePage.scoreList %}
  <div class="column">
    {%
      include "components/ScoreList.html"
        listTitle: items.listTitle
        itemList: items.listItems
        buttonText: items.buttonText
    %}
  </div>
{% endfor %}
</div>

<div class="ui one column stackable grid">
  <div class="column">
    {% include "components/TestSuiteList.html" %}
  </div>
</div>
