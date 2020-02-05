export default counter => {
  return () => `<span class='blank'>
                  <span>${++counter.val}</span>
                  <span class="blank-line"></span>
                </span>`;
};
