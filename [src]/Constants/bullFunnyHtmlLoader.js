export const bullFunnyHtmlLoader = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body {
    margin: 0;
    height: 100vh;
  }

  .spinner {
    font-size: 28px;
    position: absolute;
    inset: 0;
    margin: auto;
    width: 1em;
    height: 1em;
  }

  .spinner-blade {
    position: absolute;
    left: 0.4629em;
    bottom: 0;
    width: 0.074em;
    height: 0.2777em;
    border-radius: 0.0555em;
    background-color: transparent;
    transform-origin: center -0.2222em;
    animation: spinner-fade 1s infinite linear;
  }

  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
    .spinner-blade:nth-child(${i + 1}) {
      transform: rotate(${i * 30}deg);
      animation-delay: ${i * 0.083}s;
    }
  `,
    )
    .join('')}

  @keyframes spinner-fade {
    0% { background-color: #69717d; }
    100% { background-color: transparent; }
  }
</style>
</head>
<body>
  <div class="spinner">
    ${'<div class="spinner-blade"></div>'.repeat(12)}
  </div>
</body>
</html>
`;
