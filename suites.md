---js
{
  pagination: {
    before: function(paginationData) {
      let suites = [];
      // add respecConfig.shortName to each matrix
      paginationData.forEach((suite) => {
        let matrices = suite.matrices;
        const matricesMapped = matrices.map((matrix) => {
          matrix.reportName = suite.respecConfig.shortName;
          return matrix;
        });
        suites = suites.concat(matricesMapped);
      });
      // combine matricies into single array
      // output suites
      return suites;
    },
    data: "results",
    size: 1,
    alias: "matrix"
  },
  permalink: "/reports/{{ matrix.reportName | slugify }}/suites/{{ matrix.title | slugify }}/"
}
---
<section id="{{ matrix.title }}">
  <h2>{{ matrix.title }}</h2>
  <div>
    <table class="ui celled structured table">
      <thead>
        <tr>
          <th rowspan="2" width="20%">{{ matrix.rowLabel }}</th>
          <th class="center aligned" colspan={{ matrix.columns.length }} >{{ matrix.columnLabel }}</th>
        </tr>
        <tr>
        {% for column in matrix.columns %}
          <th>{{ column }}</th>
        {% endfor %}
        </tr>
      </thead>
      <tbody>
      {% for row in matrix.rows %}
        <tr>
          <!--This is the name of the test-->
          <td>{{ row.id }}</td>
          <!--These contain if the test passed, failed, or was skipped-->
          {% for cell in row.cells %}
            <td class="{{ cell.state | getStatusColors }} {{ cell.optional | getOptional }}">
              <div 
                class="ui simple dropdown item" 
                style="
                  width: 100%;
                  display: flex;
                  min-height: 40px;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>{{ cell.state | getStatusMark }}</div>
                {% if cell.err %}    
                  <div class="menu">
                    <div class="item">{{ cell.err.message }}</div>
                  </div>
                {% endif %}
              </div>
            </td>
          {% endfor %}
        </tr>
      {% endfor %}
      </tbody>
    </table>
  </div>
  <div>
    <div>
      <div>
      {% if matrix.images %}
        {% for image in matrix.images %}
          <img src={{ image.src }} />
          {% for data in image.meta %}
            <div>
              {{ data }}
            </div>
          {% endfor %}
        {% endfor %}
      {% endif %}
      </div>
      <div>
      {% if matrix.reportData %}
        {% for report in reportData %}
          {% if report.details %}
            <details>
              <summary>{{ report.label }}</summary>
              <pre>{{ report.data }}</pre>
            </details>
          {% else %}
            <pre>{{ report.data }}</pre>
          {% endif %}
        {% endfor %}
      {% endif %}
      </div>
    </div>
  </div>
</section>
