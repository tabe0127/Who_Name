import React from 'react';

type entries = {
  id: number;
  name: string;
  imgURL: string[];
};

export default function InputName({
  setSceneController,
  entries,
  setEntries,
}: {
  setSceneController: React.Dispatch<React.SetStateAction<string>>;
  entries: entries[];
  setEntries: React.Dispatch<React.SetStateAction<entries[]>>;
}) {
  const handleAddName = () => {
    setEntries((prevNames) => [
      ...prevNames,
      { id: prevNames.length + 1, name: '', imgURL: [] },
    ]);
  };

  const handleNameChange = (id: number, newValue: string) => {
    setEntries((prevNames) =>
      prevNames.map((name) =>
        name.id === id ? { ...name, name: newValue } : name
      )
    );
  };

  const handleRemoveName = (id: number) => {
    setEntries((prevNames) => prevNames.filter((name) => name.id !== id));
  };

  // 名前が一つでも入力されているか確認
  const isSubmitDisabled = entries.every(({ name }) => name.trim() === '');

  return (
    <div style={{ margin: '20px', padding: '10px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        プレイヤーを登録
      </h1>
      <p
        style={{
          fontSize: '12px',
          textAlign: 'center',
          margin: '5px 0',
        }}
      >
        覚えてほしい名前(本名など)で入力してね
      </p>
      {entries.map(({ id, name }) => (
        <div
          key={id}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <input
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => handleNameChange(id, e.target.value)}
            style={{ padding: '5px', border: '1px solid #ccc' }}
          />
          <button
            onClick={() => handleRemoveName(id)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#DC3545',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            −
          </button>
        </div>
      ))}
      <button
        onClick={handleAddName}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
        className="mt-5"
      >
        ＋
      </button>
      <br />
      <button
        onClick={() => setSceneController('ImageUpload')}
        disabled={isSubmitDisabled}
        style={{
          padding: '10px 20px',
          backgroundColor: isSubmitDisabled ? '#ccc' : '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
        }}
        className="m-5"
      >
        画像登録へ進む
      </button>
    </div>
  );
}
