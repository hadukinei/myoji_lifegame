/**
 * myoji-yurai.net上のDevTool上でデータ取得
 * コンソールログ上で下記コードをコピペして実行します
 * 出力結果をフォームまたは初期化データにコピペして保存してください
 */

// (d=>{const txt=[];d.querySelectorAll('.post table.simple tbody tr').forEach(tr=>{txt.push(tr.querySelector('td a').innerHTML+"\t"+Math.ceil((tr.querySelector('td:last-of-type').innerHTML.replace(/[^0-9]/g,'')-0)/10000));});console.log(txt.join("\r\n"));})(document);


/**
 * ページ内の処理
 */
(() => {
  /** general initialization */
  let load = () => {
    // add event listener
    document.querySelector('button#start').addEventListener('click', start);
    document.querySelector('button#stop').addEventListener('click', stop);
    document.querySelector('button#init').addEventListener('click', init);
  };


  /** mask set */
  let mask_set = () => {
    document.querySelector('aside#mask').dataset.state = 'visible';
  };

  /** mask unset */
  let mask_unset = () => {
    document.querySelector('aside#mask').dataset.state = 'hidden';
  };


  /** onClick: button#start */
  let start = () => {
    mask_set();

    setTimeout(() => {
      // set state to playing/pause
      if(!document.querySelectorAll('section#table ol li').length){
        document.querySelector('main').dataset.state = 'pause';
        mask_unset();
        return;
      }else if(document.querySelector('main').dataset.state === 'pausing'){
        document.querySelector('main').dataset.state = 'pause';
        mask_unset();
        return;
      }else{
        document.querySelector('main').dataset.state = 'playing';
      }

      // if there are no marriable one, drop out one
      if(document.querySelectorAll('section#table ol li').length % 2 === 1){
        document.querySelector('section#table ol').removeChild(
          document.querySelector('section#table ol li:last-of-type')
        );
      }

      // even marry odd
      let nodes = [];
      Array.from(document.querySelectorAll('section#table ol li'))
      .sort(() => ~~(Math.random() * 3) - 1)
      .forEach(node => {
        nodes.push(node);
      });

      for(let i = 0, l = nodes.length; i < l; i += 2){
        // decide family-name by random
        let id = 0;
        let color = '';

        if(~~(Math.random() * 2) - 0){
          id = nodes[i].dataset.id;
          color = nodes[i].style.backgroundColor;
        }else{
          id = nodes[i + 1].dataset.id;
          color = nodes[i + 1].style.backgroundColor;
        }

        // set family-name
        nodes[i].dataset.id = id;
        nodes[i].style.backgroundColor = color;
        if(nodes[i + 1]){
          nodes[i + 1].dataset.id = id;
          nodes[i + 1].style.backgroundColor = color;
        }
      }

      nodes = null;

      // recalc indexes
      let max = 0;

      document.querySelectorAll('#table ul li')
      .forEach(idx => {
        let count = document.querySelectorAll('section#table ol li[data-id="' + idx.dataset.id + '"]').length;
        idx.querySelector('small').innerHTML = count + '';
        idx.dataset.tmpcnt = count + '';
        if(count > max) max = count;
      });

      document.querySelectorAll('#table ul li')
      .forEach(idx => {
        let rate = ~~((idx.dataset.tmpcnt - 0) / max * 100);
        idx.querySelector('meter').value = rate + '';
        idx.style.order = (max - (idx.dataset.tmpcnt - 0)) + '';
        idx.removeAttribute('data-tmpcnt');
      });

      // increase generation
      let gen = document.querySelector('#generation').innerHTML - 0;
      document.querySelector('#generation').innerHTML = gen + 1 + '';

      // gameset
      // reserve next generation
      if(document.querySelector('main').dataset.state === 'playing'){
        setTimeout(() => {
          start();
        }, 500);
      }

      mask_unset();
    }, 10);
  };


  /** onClick: button#stop */
  let stop = () => {
    // set state to pausing (temporary state for pause)
    document.querySelector('main').dataset.state = 'pausing';
  };


  /** onClick: button#init */
  let init = () => {
    mask_set();

    setTimeout(() => {
      // check init-data
      let txa_data = document.querySelector('section#data textarea').value;
      if(!txa_data){
        mask_unset();
        alert('ERR_100: データが存在しません');
        return;
      }

      let def_data = txa_data.replace(/\r\n/g, '\n').replace(/\r/g, "\n").replace(/\n+/g, "\n").replace(/(^\n|\n$)/, '');
      if(!def_data){
        mask_unset();
        alert('ERR_101: データが存在しません');
        return;
      }


      // parse init-data
      def_data = def_data.split("\n");
      for(let i = 0, l = def_data.length; i < l; i ++){
        def_data[i] = def_data[i].split("\t");

        if(def_data[i].length !== 2){
          mask_unset();
          alert('ERR_110: データの書式が正しくありません');
          return;
        }
        if(def_data[i][0] === ''){
          mask_unset();
          alert('ERR_111: データの名字が空欄です');
          return;
        }
        if(def_data[i][1] === ''){
          mask_unset();
          alert('ERR_112: データの件数が空欄です');
          return;
        }
        if(/[^0-9]/.test(def_data[i][1])){
          mask_unset();
          alert('ERR_113: データの件数に数字以外の文字が含まれています');
          return;
        }

        def_data[i][0] = def_data[i][0] + ''; // name
        def_data[i][1] = ~~(def_data[i][1]); // count
        def_data[i][2] = ~~(Math.random() * 1000000000); // sort-order
        def_data[i][3] = i; // id
      }


      // set index-data
      let index_data = [];
      let index_max = 100;
      for(i = 0, l = def_data.length; i < l; i ++){
        if(index_max < def_data[i][1]){
          index_max = def_data[i][1];
        }

        index_data.push({
          id: def_data[i][3],
          name: def_data[i][0],
          count: def_data[i][1],
          color:
            '#'
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
            + (~~(Math.random() * 255)).toString(16).padStart(4, "0").substring(2, 4)
        });
      }


      // set list-data
      let node_data = [];
      for(i = 0, l = def_data.length; i < l; i ++){
        for(let j = 0, m = def_data[i][1]; j < m; j ++){
          node_data.push({
            id: def_data[i][3],
            name: def_data[i][0],
            value: ~~(Math.random() * 1000000000)
          });
        }
      }
      node_data.sort((a, b) => a.value - b.value);


      // clear dom
      if(document.querySelectorAll('section#table ol li').length !== 0){
        document.querySelectorAll('section#table ol li').forEach(li => {
          li.remove();
        });
      }
      if(document.querySelectorAll('section#table ul li').length !== 0){
        document.querySelectorAll('section#table ul li').forEach(li => {
          li.remove();
        });
      }


      // set dom: table
      let parent_node = document.querySelector('section#table ol');

      node_data.forEach(dat => {
        let child_node = document.createElement('li');
        parent_node.appendChild(child_node);
        child_node.setAttribute('data-id', dat.id);

        let tmp_index = index_data.filter(arr => arr.id === dat.id);
        if(tmp_index.length === 0){
          child_node.style.backgroundColor = '#0000';
        }else{
          child_node.style.backgroundColor = tmp_index[0].color;
        }

        child_node = null;
      });

      parent_node = null;


      // set dom: generation
      document.querySelector('b#generation').innerHTML = '1';

      // set dom: index
      parent_node = document.querySelector('section#table ul');

      index_data.forEach(dat => {
        let child_node = document.createElement('li');
        let color_node = document.createElement('data');
        let name_node = document.createElement('span');
        let name_text = document.createTextNode(dat.name);
        let count_node = document.createElement('small');
        let count_text = document.createTextNode(dat.count);
        let bar_node = document.createElement('meter');
        let bar_value = ~~(dat.count / index_max * 100);

        parent_node.appendChild(child_node);
        child_node.appendChild(color_node);
        child_node.appendChild(name_node);
        name_node.appendChild(name_text);
        child_node.appendChild(count_node);
        count_node.appendChild(count_text);
        child_node.appendChild(bar_node);

        child_node.setAttribute('data-id', dat.id);
        color_node.style.backgroundColor = dat.color;
        bar_node.setAttribute('value', bar_value);
        bar_node.setAttribute('min', 0);
        bar_node.setAttribute('max', 100);
        bar_node.setAttribute('low', 0);
        bar_node.setAttribute('high', 50);
        bar_node.setAttribute('optimum', 50);

        child_node = color_node = name_node = name_text = count_node = count_text = bar_node = null;
      });

      parent_node = null;

      mask_unset();
    }, 10);
  };

  /** onLoad */
  document.addEventListener('DOMContentLoaded', load);
})();
