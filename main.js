(() => {
  /** general initialization */
  let load = () => {
    // add event listener
    document.querySelector('button#start').addEventListener('click', start);
    document.querySelector('button#stop').addEventListener('click', stop);
    document.querySelector('button#init').addEventListener('click', init);

    // append large file-size resource
    let parent = document.querySelector('head');
    let child = document.createElement('link');
    parent.appendChild(child);
    child.rel = 'stylesheet';
    child.href = 'https://fonts.googleapis.com/css2?family=Kiwi+Maru:wght@500&display=swap';
  };


  /** mask set */
  let mask_set = () => {
    document.querySelector('aside#mask').dataset.state = 'visible';
  };

  /** mask unset */
  let mask_unset = () => {
    document.querySelector('aside#mask').dataset.state = 'hidden';
  };


  /** logger */
  const logger = {
    SUVIVOR: 1,
    ALONE: 2,
    BIRTH: 3,
    DEAD: 4,
    EXTINCT: 5
  };

  let logging = (mode, id, name) => {
    let node = document.createElement('dd'), text;
    let gen = document.querySelector('#generation').innerHTML;

    switch(mode){
      case logger.SUVIVOR:
        text = document.createTextNode('【決着】'+ name + ' 家が第 ' + gen + ' 世代で名字を統一しました');
      break;
      case logger.BIRTH:
        text = document.createTextNode('['+ gen + '] ' + name + ' さん出産を報告');
      break;
      case logger.EXTINCT:
        text = document.createTextNode('['+ gen + '] ' + name + ' 家が断絶');
      break;
      case logger.ALONE:
        //text = document.createTextNode('['+ gen + '] ' + name + ' 家で孤独死か');
      //break;
      case logger.DEAD:
        //text = document.createTextNode('['+ gen + '] ' + name + ' 家で死者発生');
      //break;
      default:
        node = null;
      return;
    }

    node.appendChild(text);
    node.dataset.id = id;
    node.dataset.mode = mode;

    document.querySelector('section#table dl').insertBefore(node, document.querySelector('section#table dl').firstChild);
    node = null;
  };


  /** onClick: button#start */
  let start = () => {
    mask_set();

    setTimeout(() => {
      // set state to playing/pause
      if(Array.from((new Map(Array.from(document.querySelectorAll('section#table ol li')).map(li=>[li.dataset.id,0])))).length < 2){
        let id = document.querySelector('section#table ol li').dataset.id;
        let name = document.querySelector('#table ul li[data-id="' + id + '"] span').innerHTML;

        logging(logger.SUVIVOR, id, name);

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
        let id = document.querySelector('section#table ol li:last-of-type').dataset.id;
        let name = document.querySelector('#table ul li[data-id="' + id + '"] span').innerHTML;

        logging(logger.ALONE, id, name);

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

      let children = [];
      let deadmen = [];

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

        // birth new child
        if(Math.random() * 100 <= 0.0315){
          children.push({
            id: id,
            color: color
          });
        }

        // rest in peace
        if(Math.random() * 100 <= 0.129){
          deadmen.push({
            elm: nodes[i],
            id: id
          });
        }
        if(Math.random() * 100 <= 0.129){
          deadmen.push({
            elm: nodes[i + 1],
            id: id
          });
        }
      }

      // push new children into dom
      children.forEach(c => {
        let li = document.createElement('li');
        li.dataset.id = c.id;
        li.style.backgroundColor = c.color;
        nodes.push(li);

        document.querySelector('section#table ol').appendChild(li);

        let name = document.querySelector('#table ul li[data-id="' + c.id + '"] span').innerHTML;
        logging(logger.BIRTH, c.id, name);

        li = null;
      });

      // shift dead men/women from dom
      deadmen.forEach(c => {
        nodes.splice(1);

        document.querySelector('section#table ol').removeChild(c.elm);
        c.elm = null;

        let name = document.querySelector('#table ul li[data-id="' + c.id + '"] span').innerHTML;
        logging(logger.DEAD, c.id, name);

        li = null;
      });

      // check extinct families
      let liveFamilyId_table = Array.from(new Map(Array.from(document.querySelectorAll('section#table ol li')).map(li=>[li.dataset.id,0])).keys()).sort();
      let lifeFamilyId_index = Array.from(document.querySelectorAll('section#table ul li')).filter(li=>li.querySelector('small').innerHTML!=='0').map(li=>li.dataset.id).sort();
      lifeFamilyId_index.filter(id => !liveFamilyId_table.includes(id)).forEach(id => {
        let name = document.querySelector('#table ul li[data-id="' + id + '"] span').innerHTML;
        logging(logger.EXTINCT, id, name);
      });

      // recalc indexes
      nodes = null;
      let max = 0;
      let total = 0;

      document.querySelectorAll('#table ul li')
      .forEach(idx => {
        let count = document.querySelectorAll('section#table ol li[data-id="' + idx.dataset.id + '"]').length;
        idx.querySelector('small').innerHTML = count + '';
        idx.dataset.tmpcnt = count + '';
        if(count > max) max = count;
        total += count;
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

      // update population
      document.querySelector('#population').innerHTML = total + '';

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
        def_data[i][2] = i; // id
      }


      // set index-data
      let index_data = [];
      let index_max = 0;
      for(i = 0, l = def_data.length; i < l; i ++){
        if(index_max < def_data[i][1]){
          index_max = def_data[i][1];
        }

        index_data.push({
          id: def_data[i][2],
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
            id: def_data[i][2],
            name: def_data[i][0],
            value: ~~(Math.random() * 1000000000) // sort-order
          });
        }
      }
      node_data.sort((a, b) => a.value - b.value);


      // clear dom
      if(document.querySelectorAll('section#table ol li').length !== 0){
        document.querySelectorAll('section#table ol li').forEach(li => {
          li.parentNode.removeChild(li);
        });
      }
      if(document.querySelectorAll('section#table dl dd').length !== 0){
        document.querySelectorAll('section#table dl dd').forEach(dd => {
          dd.parentNode.removeChild(dd);
        });
      }
      if(document.querySelectorAll('section#table ul li').length !== 0){
        document.querySelectorAll('section#table ul li').forEach(li => {
          li.parentNode.removeChild(li);
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

      // set dom: generation
      document.querySelector('b#generation').innerHTML = '1';

      // set dom: population
      let total = 0;
      document.querySelectorAll('#table ul li')
      .forEach(idx => {
        let count = document.querySelectorAll('section#table ol li[data-id="' + idx.dataset.id + '"]').length;
        total += count;
      });
      document.querySelector('#population').innerHTML = total + '';

      mask_unset();
    }, 10);
  };

  /** onLoad */
  document.addEventListener('DOMContentLoaded', load);
})();
