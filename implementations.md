---
pagination:
  data: implementations
  size: 1
  alias: implementation
permalink: "/implementations/{{ implementation | slugify }}"
---

{% assign imp = implementations[implementation].settings %}
# {{ implementation }} - {{ imp.implementation }}

## Support

{% if imp.issuers %}
### Issuers
{% for issuer in imp.issuers %}
`{{ issuer.id }}`
<div class="ui tiny labels">{% for tag in issuer.tags %}<span class="ui tag label">{{ tag }}</span>{% endfor %}</div>

---
{% endfor %}
{% endif %}

{% if imp.verifiers %}
### Verifiers
{% for verifier in imp.verifiers %}
`{{ verifier.id }}`
<div class="ui tiny labels">{% for tag in verifier.tags %}<span class="ui tag label">{{ tag }}</span>{% endfor %}</div>

---
{% endfor %}
{% endif %}

{% if imp.vpVerifiers %}
### Verifiable Presentation Verifiers
{% for verifier in imp.vpVerifiers %}
`{{ verifier.id }}`
<div class="ui tiny labels">{% for tag in verifier.tags %}<span class="ui tag label">{{ tag }}</span>{% endfor %}</div>

---
{% endfor %}
{% endif %}
