// NoteContent.jsx

const NoteContent = () => {
  return (
    <div className='w-3/4 p-4'>
      {/* 笔记内容区 */}
      <div className='mb-4'>这是一条笔记的内容</div>
      <div className='flex items-center border p-2'>
        <button className='mr-2 bg-gray-200 p-2 hover:bg-gray-300'>加粗</button>
        <button className='mr-2 bg-gray-200 p-2 hover:bg-gray-300'>复制</button>
        <button className='bg-gray-200 p-2 hover:bg-gray-300'>粘贴</button>
      </div>
    </div>
  );
};

export default NoteContent;
