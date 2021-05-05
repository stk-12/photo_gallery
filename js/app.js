window.addEventListener('load', init);

const pictures = [
    '../images/1.jpg',
    '../images/2.jpg',
    '../images/3.jpg',
    '../images/4.jpg',
    '../images/5.jpg',
    '../images/1.jpg',
    '../images/2.jpg',
    '../images/3.jpg',
    '../images/4.jpg',
    '../images/5.jpg',
    '../images/1.jpg',
    '../images/2.jpg',
    '../images/3.jpg',
    '../images/4.jpg',
    '../images/5.jpg'
];

function init(){
    // 描画領域を変数に格納
    const width = window.innerWidth;
    const height = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#canvas"),
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.shadowMap.enable = true;

    // シーンを作成
    const scene = new THREE.Scene();

    //cameraを作成　new THREE.PerspectiveCamera(画角, アスペクト比, 描画開始距離, 描画終了距離)
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(0, 0, 700);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    //lightを作成
    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(3, 3, 1);
    scene.add(light);

    const lightAmb = new THREE.AmbientLight(0xFFFFFF, 0.5);
    scene.add(lightAmb);

    //オブジェクト用グループ
    const group = new THREE.Group();
    scene.add(group);

    //平面オブジェクトを作成
    const geometry = new THREE.PlaneGeometry( 80, 80, 1 );

    for(let i = 0; i < 15; i++){
        const material = new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(pictures[i])
        });
        const plane = new THREE.Mesh(geometry, material);
        
        group.add(plane);
    }

    //レンダリング
    renderer.render(scene, camera);

    // アニメーションに使用する角度
    let ang;
    let angSpeed = 0.1;
    let angle = 0;

    //初回実行
    tick();
	
    //実行するための関数
    function tick(){

        //アニメーション処理
        for(let i = 0; i < group.children.length; i++){
            ang = angle + i * (360 / group.children.length);
            group.children[i].position.y = 0;
            group.children[i].position.z = 300 * Math.sin(radian(ang));
            group.children[i].position.x = 300 * Math.cos(radian(ang));
        }

        angle += angSpeed;
        
        //レンダリング
        renderer.render(scene, camera);
        
        //自分自身を呼び続ける
        requestAnimationFrame(tick);

    }

    // ラジアンに変換
    function radian(val) {
        return val * Math.PI / 180;
    }
}