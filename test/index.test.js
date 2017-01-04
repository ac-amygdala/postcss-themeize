import postcss from 'postcss';
import plugin from '../src/index.js';

function run(input, output, opts) {
    return postcss([ plugin(opts) ]).process(input)
        .then(result => {
            expect(result.css).toEqual(output);
            expect(result.warnings().length).toBe(0);
        });
}

it('should not touch regular css', () => {
    return run('a{color:#fff;}', 'a{color:#fff;}', { });
});

it('should clear css props with "@" variable', () => {
    return run('a{color:@somevar;}', 'a{}', { });
});

it('should not touch selectors', () => {
    return run('a@somevar{}', 'a@somevar{}', { });
});

it('should add rule with theme selector', () => {
    return run(
        'a{color:@color1;}',
        `a{}
.theme1 a{
    color: rgba(255,255,255,0.1)
}`,
        {
            themes: {
                theme1: {
                    color1: 'rgba(255,255,255,0.1)'
                }
            }
        }
    );
});

it('should collect rules with one theme selector', () => {
    return run(
        'a{color:@color1;position:relative;display:@visibility1;}',
        `a{position:relative;}
.theme1 a{color:rgba(255,255,255,0.1);display:none;}`,
        {
            themes: {
                theme1: {
                    color1: 'rgba(255,255,255,0.1)',
                    visibility1: 'none'
                }
            }
        }
    );
});
