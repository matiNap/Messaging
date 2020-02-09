import React from "react";
import Svg, { Path } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import metrics from "_metrics";
import { moveTo, curveTo, lineTo, close } from "_helpers/svgHelper.ts";

const { add, sub, concat, multiply, Value, cond, eq } = Animated;

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Wave = props => {
  const {
    swipeY,
    fillColor,
    horizontalRadius,
    verticalRadius,
    centerX,
    waveHeight
  } = props;
  const waveStartX = sub(centerX, horizontalRadius);
  const { svgHeight } = metrics.login;
  const commands = [];
  const waveTopY = sub(svgHeight, waveHeight);
  const waveBottomY = svgHeight;
  const yOperation = sub;

  moveTo(commands, 0, waveTopY);
  lineTo(commands, waveStartX, waveTopY);
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 0.3322374268)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.1561501458))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 0.1346194756)),
      y: waveTopY
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 0.2412779634)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.05341339583))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 0.5350576951)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.5012484792))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 0.4030805244)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.2361659167))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 0.4561193293)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.3305285625))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 0.5689655122)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.574934875))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 0.5418222317)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.515878125))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 0.5650349878)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.5664134792))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 0.7399037439)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.8774032292))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 0.6397387195)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.7283715208))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 0.6833456585)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.8086618958))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, horizontalRadius),
      y: yOperation(waveTopY, verticalRadius)
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 0.8122605122)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.9653464583))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 0.8936183659)),
      y: yOperation(waveTopY, verticalRadius)
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 1.270484439)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.8608411667))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 1.100142878)),
      y: yOperation(waveTopY, verticalRadius)
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 1.1887991951)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.9595746667))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 1.4665102805)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.5291125625))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 1.3330544756)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.7852123333))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 1.3795848049)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.703382125))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 1.4802616098)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.5015305417))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 1.4689677195)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.5241858333))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 1.4781625854)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.505739125))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 1.687403)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.1541165417))
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 1.5714239024)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.3187486042))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 1.6204116463)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.2332057083))
    }
  });
  curveTo(commands, {
    to: {
      x: add(waveStartX, multiply(horizontalRadius, 2)),
      y: waveTopY
    },
    c1: {
      x: add(waveStartX, multiply(horizontalRadius, 1.774752061)),
      y: yOperation(waveTopY, multiply(verticalRadius, 0.0509933125))
    },
    c2: {
      x: add(waveStartX, multiply(horizontalRadius, 1.8709256829)),
      y: waveTopY
    }
  });
  lineTo(commands, metrics.screenWidth, waveTopY);

  lineTo(commands, metrics.screenWidth, waveBottomY);
  lineTo(commands, 0, waveBottomY);
  close(commands);
  const d = commands.reduce((acc, c) => concat(acc, c));
  return (
    <AnimatedSvg
      style={{
        position: "absolute",
        top: sub(swipeY, svgHeight * 0.8)
      }}
      width={metrics.screenWidth}
      height={metrics.login.svgHeight}
      pointerEvents="auto"
    >
      <AnimatedPath d={d} fill={fillColor} />
    </AnimatedSvg>
  );
};

export default Wave;
