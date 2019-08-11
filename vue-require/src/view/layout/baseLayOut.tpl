<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>{% block title %}{% endblock %}</title>
  {% block style %} {% endblock %}
</head>

<body class="skin-blue sidebar-mini">
  <div class="container">
    {% block container %} {% endblock %}
  </div>
  {% block script %}
  {% endblock %}
</body>

</html>