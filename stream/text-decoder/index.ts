(async () => {
  const text = new TextDecoderStream();
  const writer = text.writable.getWriter();
  await writer.ready;

  await writer.write(new Uint8Array([0xe9, 0xab, 0x98])); // 返回的Promise，当底层写入器返回成功Promise，该Promise就是成功

  const reader = text.readable.getReader();
  const { done, value } = await reader.read();
  console.log('read: ', done, value);
})();
