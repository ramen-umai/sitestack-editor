// グローバルに定義
let workspace = null;

window.addEventListener('DOMContentLoaded', () => {
  // Blocklyのワークスペースを初期化
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: `
      <xml xmlns="https://developers.google.com/blockly/xml">
        <category name="要素" categorystyle="html_category">
          <block type="html_h"></block>
          <block type="html_p"></block>
          <block type="html_a"></block>
          <block type="html_img"></block>
          <block type="html_ul"></block>
          <block type="html_ol"></block>
          <block type="html_li"></block>
          <block type="html_button"></block>
        </category>
        <category name="装飾" categorystyle="css_category">
          <block type="style"></block>
          <block type="body_style"></block>
          <block type="class_style"></block>
          <block type="id_style"></block>
          <block type="color"></block>
          <block type="fontsize"></block>
          <block type="bold"></block>
          <block type="radius"></block>
        </category>
        <category name="機能" categorystyle="js_category">
          <block type="js_script"></block>
          <block type="js_button_event"></block>
          <block type="js_console"></block>
          <label text="合成音声"></label>
          <block type="text_to_speech"></block>
        </category>
      </xml>`,
    media: 'https://unpkg.com/blockly/media/',
    scrollbars: true,
    trashcan: true,
    zoom: { startScale: 0.75, controls: true, wheel: true },
    grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
    renderer: 'zelos',
    theme: 'StackLight',
  });

  function updatePreview() {
    const iframe = document.getElementById('previewFrame');
    try {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      iframe.srcdoc = code;
    } catch (err) {
      showToast(`読み込みに失敗しましたエラー:${err}`, 'danger');
    }
  }

  // ワークスペースの変更を監視してプレビューを更新
  workspace.addChangeListener((event) => {
    if (
      event.type === Blockly.Events.BLOCK_CREATE ||
      event.type === Blockly.Events.BLOCK_MOVE ||
      event.type === Blockly.Events.BLOCK_CHANGE ||
      event.type === Blockly.Events.BLOCK_DELETE
    ) {
      updatePreview();
    }
  });

  // 初期表示
  updatePreview();
});

// =================
// グローバル関数
// =================

// トースト通知表示用
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-3`;
  toast.role = 'alert';
  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  `;
  document.body.appendChild(toast);
  const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
  bsToast.show();
  toast.addEventListener('hidden.bs.toast', () => toast.remove());
}

// getTitleValue関数
function getTitleValue() {
  const titleInput = document.getElementById('title');
  const titleValue = titleInput.value;
  return titleValue;
}

// 保存
function save() {
  const title = getTitleValue();
  if (!title) {
    showToast('タイトルを入力してください', 'danger');
    return;
  }
  try {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    const blob = new Blob([xmlText], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('ワークスペースを保存しました');
  } catch (err) {
    console.error(err);
    showToast('保存に失敗しました', 'danger');
  }
}

// 読み込み
function load() {
  if (confirm('すべてのブロックを削除しますか？')) {
    workspace.clear();
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.xml';
  input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const xmlText = e.target.result;
          const xml = Blockly.utils.xml.textToDom(xmlText);
          Blockly.Xml.domToWorkspace(xml, workspace);
          showToast('ブロックを読み込みました');
        } catch (err) {
          console.error('ワークスペースの読み込みエラー:', err);
          showToast('読み込みに失敗しました', 'danger');
        }
      };
      reader.readAsText(file);
    }
  });
  input.click();
  }
}

// エクスポート
function expt() {
  const title = getTitleValue();
  if (!title) {
    showToast('タイトルを入力してください', 'danger');
    return;
  }
  try {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    const fullHtml = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body>
${code}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('HTMLファイルをエクスポートしました');
  } catch (err) {
    console.error(err);
    showToast('エクスポートに失敗しました', 'danger');
  }
}

document.getElementById('btn-clear').addEventListener('click', () => {
  if (confirm('すべてのブロックを削除しますか？')) {
    workspace.clear();
    showToast('ワークスペースを初期化しました');
  }
});
