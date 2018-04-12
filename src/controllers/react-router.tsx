import React from 'react';
import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router, matchPath } from 'react-router';
import { Helmet } from 'react-helmet';
import { matchRoutes } from 'react-router-config';

import routes from '~/routes';

export default function(req: Request, res: Response) {
  const branch = matchRoutes(routes, req.url);
  if (!branch[0]) {
    res.sendStatus(404);
    return;
  }

  // tslint:disable-next-line
  const MatchComponent = (branch[0].route.component as any) as React.ComponentClass<any> | undefined;
  if (!MatchComponent) {
    res.sendStatus(404);
    return;
  }

  const markup = renderToString(<MatchComponent />);
  const helmetData = Helmet.renderStatic();
  const renderAttributes = {
    markup,
    base: helmetData.base.toString(),
    bodyAttributes: helmetData.bodyAttributes.toString(),
    htmlAttributes: helmetData.htmlAttributes.toString(),
    link: helmetData.link.toString(),
    meta: helmetData.meta.toString(),
    noscript: helmetData.noscript.toString(),
    script: helmetData.script.toString(),
    style: helmetData.style.toString(),
    title: helmetData.title.toString(),
  };
  console.log(renderAttributes);
  res.render('index', renderAttributes);
}

// match({ routes, location: req.url }, (err, redirectLocation, props) => {
//   if (err) {
//     res.status(500).send(err.message);
//   } else if (redirectLocation) {
//     res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//   } else if (props) {
//     // すべてのコンポーネントのうち、初期化処理が入っているものを絞込んですべて実行する・・・微妙感あるな・・・
//     // 少なくともflowtypeかTypeScriptでinterface実装したくなるなぁ・・・
//     // 参考: http://qiita.com/hmarui66/items/4f75e624c4f70d596873#%E9%9D%9E%E5%90%8C%E6%9C%9F%E3%81%A7%E5%8F%96%E5%BE%97%E3%81%97%E3%81%9F%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AC%E3%83%B3%E3%83%80%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%99%E3%82%8B%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3-2
//     const components = props.components.filter(component => component.fetchData);
//     Promise.all(components.map(component => store.dispatch(component.fetchData())))
//       .then(() => {
//         const markup = renderToString(
//           <Provider store={store}>
//             <RouterContext {...props} />
//           </Provider>,
//         );
//         const { title, htmlAttributes, meta, link, script, style } = helmet.rewind();
//         res.render('index', {
//           markup,
//           title,
//           htmlAttributes,
//           meta,
//           link,
//           script,
//           style,
//           appState: JSON.stringify(store.getState()),
//         });
//       })
//       .catch(error => {
//         res.status(500).send(error.message);
//       });
//   } else {
//     res.sendStatus(404);
//   }
// });
