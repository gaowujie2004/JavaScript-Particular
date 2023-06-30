function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function readableStreamConstructor() {
    const myStream = new ReadableStream({
        // 在构造函数中调用一次。
        start(controller) {
            controller.enqueue('abc'); // 同步进入内部队列
            console.log('controller.desiredSize', controller.desiredSize);
        },
        // 当内部队列 < 高位线时，会多次调用 pull 函数。
        // pull函数若返回一个Promise，则会等Promise成功后再次调用 pull 函数
        pull(controller) {
            console.log('pull call-', controller.desiredSize);
        },
        cancel(reason) {
            console.log('我关闭了', reason);
        },
    }, { highWaterMark: 10, size: (chunk) => chunk.length });
}
// readableStreamConstructor();
async function readableStreamInstance() {
    console.log('------readableStreamInstance');
    const myStream = new ReadableStream({
        // 在构造函数中调用一次。
        start(controller) {
            controller.enqueue('abc'); // 同步进入内部队列
            console.log('controller.desiredSize', controller.desiredSize);
        },
        // stream 没有关闭 && 当内部队列 < 高位线时，会多次调用 pull 函数。
        // pull函数若返回一个Promise，则会等Promise成功后再次调用 pull 函数
        pull(controller) {
            console.log('pull call-', controller.desiredSize);
        },
        cancel(reason) {
            console.log('我关闭了', reason);
        },
    }, { highWaterMark: 10, size: (chunk) => chunk.length });
    myStream.cancel('ok');
}
// readableStreamInstance();
async function readableStreamDefaultController() {
    console.log('------readableStreamDefaultController');
    const myStream = new ReadableStream({
        // 在构造函数中调用一次。
        async start(controller) {
            window['rscontroller'] = controller;
            // controller.enqueue('abc'); // 同步进入内部队列
            // console.log('controller.desiredSize', controller.desiredSize);
            // await sleep(2000);
            // controller.enqueue('123'); // 同步进入内部队列
            // await sleep(2000);
            // controller.enqueue('456'); // 同步进入内部队列
        },
        // stream 没有关闭 && 当内部队列 < 高位线时，会多次调用 pull 函数。
        // pull函数若返回一个Promise，则会等Promise成功后再次调用 pull 函数
        pull(controller) {
            console.log('pull 生产数据', controller.desiredSize);
            // controller.enqueue('-abc'); // 同步进入内部队列
            // console.log('pull call desiredSize', controller.desiredSize);
            // return new Promise((r) => {
            //   setTimeout(() => {
            //     console.log('pull promise OK');
            //     r();
            //   }, 4000);
            // });
        },
        cancel(reason) {
            console.log('我关闭了', reason);
        },
    }, { highWaterMark: 10, size: (chunk) => chunk.length });
    const myReader = myStream.getReader();
    window['myStream'] = myStream;
    window['reader'] = myReader;
    while (true) {
        const { done, value } = await myReader.read();
        if (done) {
            console.log('读完了');
            break;
        }
        console.log('has value:', value);
    }
}
// readableStreamDefaultController();
