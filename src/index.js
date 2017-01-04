import * as postcss from 'postcss';
import * as _ from 'underscore';

export default postcss.plugin('postcss-themeize', (options = {}) => {
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
                const matches = decl.value.match(/@([a-zA-Z0-9]+)\s*?/);
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
                const themeRule = rule.cloneAfter({
                    selector: `.${theme} ${rule.selector}`
                });

                themeRule.removeAll().append(decls);
            });

        });

    };
});