// Colors pulled from Fomantic-UI's current theme
const colors = {
  passed: '#00b5ad', // teal
  failed: '#db2828', // red
  pending: '#fbbd08', // yellow
  background: '#767676' // gray
};

/**
 * BarRating component displays a bar of test statistics.
 *
 * @param {number} passed - Number of tests passed.
 * @param {number} pending - Number of tests pending.
 * @param {number} failed - Number of tests failed.
 * @param {number} total - Total number of tests.
 * @param {string} width - Width of component, defaults to 40%.
 * @returns {string} BarRating component for ScoreList.
 */
function BarRating(passed, pending, failed, total, width) {
  // Style
  const componentWidth = width ? `${width}` : '40%';
  // Percentage of test passed, pending, & failed
  const passedWidth = Math.round(passed / total * 100);
  const pendingWidth = Math.round(pending / total * 100);
  const failedWidth = Math.round(failed / total * 100);
  return `
    <div
      style="
        height: 2em;
        display: flex;
        overflow-x: auto;
        max-width: 375px;
        border-radius: 3px;
        width: ${componentWidth};
        background-color: ${colors.background};"
    >
      <div
        style="
          height: 2em;
          width: ${passedWidth}%;
          background-color: ${colors.passed};">
      </div>
      <div
        style="
          height: 2em;
          width: ${pendingWidth}%;
          background-color: ${colors.pending};">
      </div>
      <div
        style="
          height: 2em;
          width: ${failedWidth}%;
          background-color: ${colors.failed};">
      </div>
    </div>
  `;
}

module.exports = BarRating;
