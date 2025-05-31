export default function AdviceDashboard({ advice }) {
  // If advice is a string, render as HTML. If object with adviceHtml, render that. Otherwise, render JSON.
  let htmlContent = '';
  if (typeof advice === 'string') {
    htmlContent = advice;
  } else if (advice && typeof advice.adviceHtml === 'string') {
    htmlContent = advice.adviceHtml;
  } else {
    htmlContent = `<pre style="font-size:1em;">${JSON.stringify(advice, null, 2)}</pre>`;
  }
  return (
    <section style={{ maxWidth: 600, margin: '0 auto', background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 12px #0369a122', minHeight: 200 }}>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </section>
  );
}
