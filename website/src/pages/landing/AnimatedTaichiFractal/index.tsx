import React from "react";
import TypeIt from "typeit-react";
// import { useSpring, animated } from '@react-spring/web';
import Fractal from "../../../../static/img/fractal.gif";
import styles from "./terminal-window.module.scss";
require("./prism-coldark-dark.min.css");

export interface AnimatedTaichiFractalProps {
  title: string;
  language: string;
}

/**
 * A (dark-themed) Taichi Fractal Animation component.
 */
export default function AnimatedTaichiFractal({
  title,
  language,
}: AnimatedTaichiFractalProps) {
  const [typingDone, setTypingDone] = React.useState(false);

  return (
    <div className={styles["terminal"]}>
      {title && (
        <div className="text-sm opacity-50 text-center text-warm-gray-50">
          {title}
        </div>
      )}
      <div className="py-3 px-5">
        <pre
          className={`text-left language-${language} whitespace-normal font-mono`}
        >
          <code>
            <TypeIt
              options={{
                speed: 50,
                waitUntilVisible: true,
              }}
              // Note: the following is hand-crafted from generated terminalWindow DOM
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getBeforeInit={(instance: any) => {
                instance
                  .type(
                    '<span class="token comment"># A Minimal Taichi Program #</span>'
                  )
                  .pause(1000)
                  .delete(null)
                  .type(
                    '<span class="token keyword">import</span><span class="token plain"> taichi </span><span class="token keyword">as</span><span class="token plain"> ti</span>'
                  )
                  .type("<br>")
                  .type("<br>")
                  .type(
                    '<span class="token plain">ti</span><span class="token punctuation">.</span><span class="token plain">init</span><span class="token punctuation">(</span><span class="token plain">arch</span><span class="token operator">=</span><span class="token plain">ti</span><span class="token punctuation">.</span><span class="token plain">gpu</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type("<br>")
                  .type(
                    '<div class="token-line"><span class="token plain"></span></div>'
                  )
                  .type(
                    '<span class="token plain">n </span><span class="token operator">=</span><span class="token plain"> </span><span class="token number">320</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type(
                    '<span class="token plain">pixels </span><span class="token operator">=</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">field</span><span class="token punctuation">(</span><span class="token plain">dtype</span><span class="token operator">=</span><span class="token builtin">float</span><span class="token punctuation">, </span><span class="token plain">shape</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token plain">n </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">2</span><span class="token punctuation">,</span><span class="token plain"> n</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain"></span>')
                  .type("<br>")
                  .type(
                    '<span class="token plain"></span><span class="token decorator annotation punctuation">@ti</span><span class="token decorator annotation punctuation">.</span><span class="token decorator annotation punctuation">func</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type(
                    '<span class="token plain"></span><span class="token keyword">def</span><span class="token plain"></span><span class="token function"> complex_sqr</span><span class="token punctuation">(</span><span class="token plain">z</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain"></span><span class="token keyword">return</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">Vector</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token plain">z</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token operator"> **</span><span class="token number"> 2</span><span class="token plain"></span><span class="token operator"> -</span><span class="token plain"> z</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token operator"> **</span><span class="token number"> 2</span><span class="token punctuation">,</span>'
                  )
                  .type("<br>")
                  .type(
                    '<span class="token plain">                     </span>'
                  )
                  .type(
                    '<span class="token plain"> z</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token plain"> </span><span class="token operator">*</span><span class="token plain"> z</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token plain"> </span><span class="token operator">*</span><span class="token plain"></span><span class="token number"> 2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain"></span>')
                  .type("<br>")
                  .type(
                    '<span class="token plain"></span><span class="token decorator annotation punctuation">@ti</span><span class="token decorator annotation punctuation">.</span><span class="token decorator annotation punctuation">kernel</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type(
                    '<span class="token plain"></span><span class="token keyword">def</span><span class="token plain"> </span><span class="token function">paint</span><span class="token punctuation">(</span><span class="token plain">t</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token builtin">float</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain"></span><span class="token keyword">for</span><span class="token plain"> i</span><span class="token punctuation">,</span><span class="token plain"> j </span><span class="token keyword">in</span><span class="token plain"> pixels</span><span class="token punctuation">:</span><span class="token plain"> </span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">c </span><span class="token operator">=</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">Vector</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">0.8</span><span class="token punctuation">,</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">cos</span><span class="token punctuation">(</span><span class="token plain">t</span><span class="token punctuation">)</span><span class="token plain"> </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">0.2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">z </span><span class="token operator">=</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">Vector</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token plain">i </span><span class="token operator">/</span><span class="token plain"> n </span><span class="token operator">-</span><span class="token plain"> </span><span class="token number">1</span><span class="token punctuation">,</span><span class="token plain"> j </span><span class="token operator">/</span><span class="token plain"> n </span><span class="token operator">-</span><span class="token plain"> </span><span class="token number">0.5</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token plain"> </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">2</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">iterations </span><span class="token operator">=</span><span class="token plain"> </span><span class="token number">0</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain"></span><span class="token keyword">while</span><span class="token plain"> z</span><span class="token punctuation">.</span><span class="token plain">norm</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token plain"></span><span class="token operator"> &lt;</span><span class="token plain"> </span><span class="token number">20</span><span class="token plain"> </span><span class="token keyword">and</span><span class="token plain"> iterations </span><span class="token operator">&lt;</span><span class="token plain"></span><span class="token number"> 50</span><span class="token punctuation">:</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">z </span><span class="token operator">=</span><span class="token plain"> complex_sqr</span><span class="token punctuation">(</span><span class="token plain">z</span><span class="token punctuation">)</span><span class="token plain"> </span><span class="token operator">+</span><span class="token plain"> c</span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">iterations </span><span class="token operator">+=</span><span class="token plain"> </span><span class="token number">1</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">pixels</span><span class="token punctuation">[</span><span class="token plain">i</span><span class="token punctuation">,</span><span class="token plain"> j</span><span class="token punctuation">]</span><span class="token plain"> </span><span class="token operator">=</span><span class="token plain"> </span><span class="token number">1</span><span class="token plain"> </span><span class="token operator">-</span><span class="token plain"> iterations </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">0.02</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain"></span>')
                  .type("<br>")
                  .type(
                    '<span class="token plain">gui </span><span class="token operator">=</span><span class="token plain"> ti</span><span class="token punctuation">.</span><span class="token plain">GUI</span><span class="token punctuation">(</span><span class="token string">"Julia Set"</span><span class="token punctuation">,</span><span class="token plain"> res</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token plain">n </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">2</span><span class="token punctuation">,</span><span class="token plain"> n</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain"></span>')
                  .type("<br>")
                  .type(
                    '<span class="token plain"></span><span class="token keyword">for</span><span class="token plain"> i </span><span class="token keyword">in</span><span class="token plain"> </span><span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">paint</span><span class="token punctuation">(</span><span class="token plain">i </span><span class="token operator">*</span><span class="token plain"> </span><span class="token number">0.03</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .type("<br>")
                  .type('<span class="token plain">    </span>')
                  .type(
                    '<span class="token plain">gui</span><span class="token punctuation">.</span><span class="token plain">set_image</span><span class="token punctuation">(</span><span class="token plain">pixels</span><span class="token punctuation">)</span><span class="token plain"></span>'
                  )
                  .exec(() => setTypingDone(true));

                // Remember to return it!
                return instance;
              }}
            />
          </code>
        </pre>
      </div>
      {typingDone && (
        <div className={styles["build-image"]}>
          <img src={Fractal} alt="" />
        </div>
      )}
    </div>
  );
}
