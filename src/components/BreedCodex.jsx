import React, { useState, useMemo } from 'react';
import { DOG_BREEDS } from '../data/breeds';

const GROUPS = ['All', 'Sporting', 'Hound', 'Working', 'Terrier', 'Toy', 'Non-Sporting', 'Herding', 'Wild / Native'];

export default function BreedCodex() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [activeModalBreed, setActiveModalBreed] = useState(null);

  const filteredBreeds = useMemo(() => {
    return DOG_BREEDS.filter((breed) => {
      const matchesGroup =
        selectedGroup === 'All' ||
        (selectedGroup === 'Wild / Native'
          ? breed.group.includes('Wild')
          : breed.group.toLowerCase() === selectedGroup.toLowerCase());
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        breed.name.toLowerCase().includes(q) ||
        breed.origin.toLowerCase().includes(q) ||
        breed.desc.toLowerCase().includes(q);
      return matchesGroup && matchesSearch;
    });
  }, [searchQuery, selectedGroup]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'rgba(99, 102, 241, 0.12)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            marginBottom: '16px',
          }}
        >
          <span>Stanford Dogs 120-Class Library</span>
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          HINA Canine <span className="gradient-text">Codex</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Comprehensive catalog of all 120 canine breeds recognizable by HINA's neural vision backbone. Filter by AKC breed division or search directly by breed name and origin.
        </p>
      </div>

      {/* Controls: Search Bar & AKC Group Filters */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', width: '100%' }}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search 120 breeds by name, country of origin, traits..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 46px',
              borderRadius: '9999px',
              background: 'var(--bg-base)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.25s ease',
            }}
          />
        </div>

        {/* Group Filter Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
            GROUPS:
          </span>
          {GROUPS.map((group) => {
            const isActive = selectedGroup === group;
            return (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                style={{
                  background: isActive ? 'var(--accent-gradient)' : 'var(--bg-card)',
                  color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                  border: `1px solid ${isActive ? 'transparent' : 'var(--border-subtle)'}`,
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 10px rgba(99, 102, 241, 0.3)' : 'none',
                }}
              >
                {group}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Breed Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredBreeds.map((breed) => (
          <div
            key={breed.id}
            className="glass-panel"
            onClick={() => setActiveModalBreed(breed)}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px',
              cursor: 'pointer',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--text-muted)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--border-subtle)',
                  }}
                >
                  #{String(breed.id).padStart(3, '0')}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--accent-primary)',
                    background: 'rgba(99, 102, 241, 0.12)',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {breed.group}
                </span>
              </div>

              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                {breed.name}
              </div>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                {breed.desc}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid var(--border-subtle)',
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>{breed.origin}</span>
              <span className="font-mono">{breed.lifespan}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          No dog breeds match "{searchQuery}" in group "{selectedGroup}".
        </div>
      )}

      {/* Detail Modal */}
      {activeModalBreed && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px',
          }}
          onClick={() => setActiveModalBreed(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '520px',
              width: '100%',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              background: 'var(--bg-card-elevated)',
              boxShadow: 'var(--shadow-lg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Stanford Dataset Breed Class #{activeModalBreed.id}
                </span>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
                  {activeModalBreed.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalBreed(null)}
                style={{
                  background: 'var(--border-subtle)',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span className="meta-chip group-chip">AKC: {activeModalBreed.group}</span>
              <span className="meta-chip">Origin: {activeModalBreed.origin}</span>
              <span className="meta-chip">Lifespan: {activeModalBreed.lifespan}</span>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {activeModalBreed.desc}
            </p>

            <button
              type="button"
              className="dropzone-btn"
              onClick={() => setActiveModalBreed(null)}
              style={{ width: '100%', marginTop: '8px' }}
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
