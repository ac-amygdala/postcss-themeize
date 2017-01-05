import * as postcss from 'postcss';
import * as _ from 'underscore';

module.exports = postcss.plugin('postcss-themeize', (options = {}) => {
    const themesOptions = options.themes || {};
    const themesConfig = _.reduce(themesOptions, (memo, config, theme) => {
        _.each(config, (value, rule) => {
            memo[rule] = [...(memo[rule] || []), { theme, value }];
        });

        return memo;
    }, {});

    return root => {

        root.walkRules(rule => {
            const themes = {};

            rule.walkDecls(decl => {
                const matches = decl.value.match(/@([a-zA-Z0-9\-_]+)\s*?/);
                const match = matches && matches[1];

                if (match && themesConfig[match]) {
                    const config = themesConfig[match];

                    config.forEach(({ theme, value }) => {
                        const clonedDecl = decl.clone({
                            value: decl.value.replace(`@${match}`, value)
                        });
                        const decls = themes[theme] || [];

                        themes[theme] = [...decls, clonedDecl];
                    });
                }

                if (match) {
                    decl.remove();
                }
            });

            if (_.isEmpty(themes)) {
                return;
            }

            _.each(themes, (decls, theme) => {
                let selector = rule.selector;

                if (theme !== 'default') {
                    const selectorRegex = new RegExp(`^(\.${theme}\\s)*`);
                    selector = selector
                        .split(/\s*,\s*/)
                        .map(s => s.replace(selectorRegex, `.${theme} `))
                        .join(',');
                }

                const themeRule = rule.cloneAfter({ selector });

                themeRule.removeAll().append(decls);
            });

        });

    };
});

export default module.exports;
