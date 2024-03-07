---js
{
  pagination: {
    before: function(paginationData) {
      let suites = [];
      // add respecConfig.shortName to each matrix
      paginationData.forEach((suite) => {
        let matrices = suite.matrices;
        const matricesMapped = matrices.map((matrix) => {
          matrix.reportDetails = suite.respecConfig;
          matrix.reportDetails.title = suite.title;
          return matrix;
        });
        suites = suites.concat(matricesMapped);
      });
      // combine matricies into single array and output suites
      return suites;
    },
    data: "results.all",
    size: 1,
    alias: "matrix"
  },
  permalink: "/reports/{{ matrix.reportDetails.shortName | slugify }}/suites/{{ matrix.title | slugify }}/",
  eleventyComputed: {
    breadcrumbs: [
      {
        href: "/reports/",
        title: "Reports"
      },
      {
        href: "/reports/{{ matrix.reportDetails.shortName | slugify }}/",
        title: "{{ matrix.reportDetails.title }}"
      }
    ]
  }
}
---

{% include "components/ReportDetails.html" details: matrix.reportDetails %}

<h2>{{ matrix.title }}</h2>

<section id="{{ matrix.title | slugify }}">
  <div>
    <table class="ui celled structured table">
      <thead>
        <tr>
          <th rowspan="2" width="20%">{{ matrix.rowLabel }}</th>
          <th class="center aligned" colspan={{ matrix.columns.length }} >{{ matrix.columnLabel }}</th>
        </tr>
        <tr>
        {% for column in matrix.columns %}
          <th><a href="/implementations/{{ column | removeSuffix | slugify  }}">{{ column }}</a></th>
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
            <!-- Add tooltip for errors -->
              <div {% if cell.err %} data-tooltip="{{ cell.err.message | removeQuotes }}" {% endif %}
                style="
                  width: 100%;
                  display: flex;
                  min-height: 40px;
                  align-items: center;
                  justify-content: center;
                "
              >
                <div>{{ cell.state | getStatusMark }}</div>
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
