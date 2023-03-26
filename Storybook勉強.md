# 第一章

## 参考资料

https://www.youtube.com/watch?v=BySFuXgG-ow&list=PLC3y8-rFHvwhC-j3x3t9la8-GQJGViDQk&index=1

## 搭建项目

1. 新建一个react17项目；建议使用React17版本来学习，以避免一些兼容性问题。

1. 安装storybook：我新建这个项目的时候默认的storybook版本是6.5

   ```
   npx sb init
   ```

## .storybook文件夹

### main.js

`main.js` 是 Storybook 的主要配置文件，用于配置 Storybook 的核心设置，例如注册要使用的插件、添加要加载的模块、配置自定义 webpack 配置等。这个文件的设置影响整个 Storybook 工程，包括各个 stories 的编写和预览。

常用配置如下：

1. stories；这是在yarn storybook启动项目时，根据筛选路径与后缀，拿到项目下的所有stories组件。

```js
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
```

### preview.js

`preview.js` 文件用于配置 Storybook 预览模式下的设置，例如设置全局样式、添加全局装饰器、添加全局参数等。这个文件的设置只影响 Storybook 的预览模式，而不影响编写 stories。

# 第二章

## Storybook组件结构

在storybook框架下，每一个component都应该由xxx.js，xxx.stories.js，xxx.css三个文件组成。

这里以一个Button组件为例，请参考代码注释加深理解。

src\components\Button\Button.js

```react
import React from "react";
import "./Button.css";

function Button(props) {
  // variant: 按钮样式的变量。这个参数名可以按照自己的语义随便定义，如果未通过 props 参数传递该值，则默认为 "primary"。
  // children: 按钮内部的子组件或文本内容。它是通过组件标签的闭合标签和开放标签之间的内容传递给组件的。
  // ...rest: 其他未指定的 props 参数。这些参数将作为原样传递给 <button> 元素，以便允许开发人员自定义任何其他按钮特性（例如 disabled, onClick 等）。
  const { variant = "primary", children, ...rest } = props;

  return (
    <button className={`button ${variant}`} {...rest}>
      {children}
    </button>
  );
}

export default Button;
```

src\components\Button\Button.css

```css
.button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.primary {
  background-color: #008cba;
}
.secondary {
  background-color: #e7e7e7;
}
.success {
  background-color: #4caf50;
}
.danger {
  background-color: #f44336;
}
```

src\components\Button\Button.stories.js

```js
import React from "react";
import Button from "./Button";

export default {
  title: "Button", //title是必须设置项目，它对应的是storybook界面左侧的导航栏项目收纳包
  component: Button,
};

// 以下named export会被渲染到Button package下，生成一个个不同样式的按钮实例
// variant中的css式样定义在Button.css中
export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
export const Success = () => <Button variant="success">Success</Button>;
export const Danger = () => <Button variant="danger">Danger</Button>;
```



## Storybook启动流程

当执行「yarn storybook」时，框架底层会先去上面介绍的main.js文件中，去提取出src下的所有stories文件。

每一个stories文件都会被把default export加载成一个导航栏package，再将部分export渲染到storybook的playground上。

# 第三章

## 导航栏分组

通过对title的值设置下划线就可以完成树状结构的分组。

```js
// src\components\Button\Button.stories.js
export default {
  title: "Form/Button", //分割线可以在storybook的导航栏中完成包的分组
  component: Button,
};
---------------------------------------------------------------------------------
// src\components\Input\Input.stories.js
export default {
  title: "Form/Input",
  component: Input,
};
```

## 组件表示名重命名

storyName

```react
export default {
  title: "Form/Input",
  component: Input,
};

export const Small = () => <Input size="small" placeholder="small size" />;
export const Medium = () => <Input placeholder="medium size" />;
export const Large = () => <Input size="large" placeholder="large size" />;

// 重新定义导航栏中显示的组件名
Small.storyName = "Small Input";
```



## 嵌套组合Story

Story可以import其他事先定义好的Story，进而通过组合的方式形成更复杂的Story

```js
import React from "react";
import { Primary } from "../Button/Button.stories";
import { Large } from "../Input/Input.stories";

export default {
  title: "form/Subscription",
};

export const PrimarySubscription = () => (
  <>
    <Large />
    <Primary />
  </>
);
```

# 第三章_重点

## Args机制 

https://storybook.js.org/docs/react/writing-stories/args#page-top

Args是 Storybook V6 中动态编辑组件参数的机制，

我们**无需**在组件的底层代码中定义args，就可以直接在任何Story组件上使用args属性。

所以看到下面的「SuccessWithArgs.args = 」这行代码时，不要疑惑args这个属性时哪里来的，

它是storybook底层帮我们添加的，我们可以直接使用。

示例代码：src\components\Button\Button.stories.js

```react
export default {
  title: "Form/Button",
  component: Button,
};

// 定义一个模板函数，本质上就是一个普通的箭头函数。
const Template = (props) => <Button {...props} />;

// 利用js原生函数bind返回一个新的组件函数，达到组件对象克隆的效果。
/* 为什么bind传入一个{}呢？
    因为箭头函数内部没有this，所以bind传入什么都改变不了this指向，
    这里只是传入一个空对象来占位bind的第一个参数，没有实际意义。
*/
export const SuccessWithArgs = Template.bind({});
// Args是storybook6中动态编辑组件参数的机制，我们无需在组件的底层代码中定义args，就可以像下面这样直接使用。
SuccessWithArgs.args = {
  variant: "success",
  children: "success with args",
  style: { color: "yellow" },
};
```

```react
// 当然，我们也只有跳过定义模板的环节，直接导出一个带参函数组件，并通过Args机制改变其参数。
export const ButtonWithArgs = (props) => <Button {...props} />;
ButtonWithArgs.args = {
  variant: "primary",
  children: "Primary button with args",
  style: { color: "pink" },
};
```

## 定义默认args

示例代码：src\components\Button\Button.stories.js

```react
export default {
  title: "Form/Button",
  component: Button,
  args: {
    variant: "primary",
    children: "Default Button",
  },
};

const Template = (props) => <Button {...props} />;

// 如果不设置args，就会使用export default中定义的args
export const DefaultButton = Template.bind({});
```

# 第四章

## decorators（装饰）

### 局部decorators

https://storybook.js.org/docs/react/writing-stories/decorators#component-decorators

局部定义在各个独立story的export default内

示例

```react
import Button from "./Button";

export default {
  title: "Form/Button",
  component: Button,
  decorators: [
    (Story) => (
      <div style={{ background: "pink" }}>
        <Story />
      </div>
    ),
  ],
};

/* 
export const Primary = () => <div style={{ background: "pink" }}><Button variant="primary">Primary</Button></div>;
export const Success = () => <div style={{ background: "pink" }}><Button variant="success">Success</Button></div>;
*/
// 由于定义了局部decorators，代码可以简略成下面的样子，去掉了外围重复的<div>标签
export const Primary = () => <Button variant="primary">Primary</Button>;
export const Secondary = () => <Button variant="secondary">Secondary</Button>;
```

### 全局decorators

https://storybook.js.org/docs/react/writing-stories/decorators

全局定义在「.storybook/preview.js」中

```react
export const decorators = [
  (Story) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];
```

