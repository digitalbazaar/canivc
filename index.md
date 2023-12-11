---
showHero: true
---
<div class="ui one column stackable grid container">
  <div class="column">
    <div class="ui segment">
      {% include "components/TestSuiteList.html" %}
    </div>
  </div>
</div>

<div class="ui two column stackable grid container">
{% for items in homePage %}
  <div class="column">
    <div class="ui very padded segment">
      {%
        include "components/BlockList.html"
          listTitle: items.listTitle
          itemList: items.listItems
          buttonText: items.buttonText
      %}
    </div>
  </div>
{% endfor %}
</div>


