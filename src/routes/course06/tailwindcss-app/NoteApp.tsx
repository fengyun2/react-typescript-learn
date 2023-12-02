// NoteApp.jsx
import NoteList from './NoteList';
import NoteContent from './NoteContent';

const NoteApp = () => {
  return (
    <div className='flex'>
      <NoteList />
      <NoteContent />
    </div>
  );
};

export default NoteApp;
