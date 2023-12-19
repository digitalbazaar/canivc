// Colors pulled from Fomantic-UI's current theme
const colors = {
  passed: '#00b5ad', // green
  failed: '#db2828', // red
  warning: '#fbbd08', // yellow
  background: '#767676' // gray
};

/**
 * BarRating component displays a bar of test statistics.
 *
 * @param {number} passing - Number of tests passed.
 * @param {number} total - Total number of tests.
 * @returns {string} BarRating component for ScoreList.
 */
function BarRating(passing, total) {
  // Percentage of test passed
  const passed = Math.round(passing / total * 100);
  // FIXME: Failed Placeholder
  const failed = ((100 - passed) / 2) - 2 || 0;
  // FIXME: Warning Placeholder
  const warning = ((100 - passed) / 2) - 1 || 0;
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
          width: ${passed}%; 
          background-color: ${colors.passed};">
      </div>
      <div 
        style="
          height: 2em; 
          width: ${failed}%; 
          background-color: ${colors.failed};">
      </div>
      <div 
        style="
          height: 2em; 
          width: ${warning}%; 
          background-color: ${colors.warning};">
      </div>
    </div>
  `;
}

module.exports = BarRating;
