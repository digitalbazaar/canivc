// Colors pulled from Fomantic-UI's current theme
const colors = {
  passed: "#00b5ad", // green
  failed: "#db2828", // red
  pending: "#fbbd08", // yellow
  background: "#767676" // gray
};

/**
 * BarRating component displays a bar of test statistics.
 *
 * @param {number} passed - Number of tests passed.
 * @param {number} pending - Number of tests pending.
 * @param {number} failed - Number of tests failed.
 * @param {number} total - Total number of tests.
 * @returns {string} BarRating component for ScoreList.
 */
function BarRating(passed, pending, failed, total) {
  // Percentage of test passed, pending, & failed
  const passedWidth = Math.round(passed / total * 100);
  const pendingWidth = Math.round(pending / total * 100);
  const failedWidth = Math.round(failed / total * 100);
  return `
    <div 
      style="
        width: 40%;
        height: 2em; 
        display: flex; 
        overflow-x: auto;
        border-radius: 3px;
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
