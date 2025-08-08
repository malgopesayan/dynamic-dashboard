// src/components/sidebar/Sidebar.tsx
'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { Button, Card, Empty, Input, Tag } from 'antd';

const Sidebar = () => {
  const { polygons, selectedPolygonId, setSelectedPolygonId, deletePolygon, updatePolygonData } = useStore();

  const selectedPolygon = polygons.find(p => p.id === selectedPolygonId);

  return (
    <div style={{ 
      width: '380px', 
      padding: '20px', 
      borderLeft: '1px solid #e8e8e8', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
      boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
      overflowY: 'auto'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '25px',
        padding: '15px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        color: 'white',
        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
      }}>
        <h2 style={{margin: 0, fontSize: '24px', fontWeight: '600'}}>🎛️ Controls</h2>
      </div>
      
      <div style={{marginBottom: '25px'}}>
        {polygons.map(poly => (
           <Card 
              key={poly.id} 
              size="small"
              title={
                <span style={{fontWeight: '600', color: '#2c3e50'}}>{poly.name}</span>
              }
              style={{ 
                marginBottom: '12px', 
                border: poly.id === selectedPolygonId ? '2px solid #667eea' : '1px solid #e8e8e8',
                borderRadius: '10px',
                boxShadow: poly.id === selectedPolygonId ? '0 4px 15px rgba(102, 126, 234, 0.2)' : '0 2px 8px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedPolygonId(poly.id)}
              extra={
                <Button 
                  type="text" 
                  danger 
                  size="small"
                  style={{borderRadius: '6px'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePolygon(poly.id);
                  }}
                >
                  🗑️
                </Button>
              }
           >
             {typeof poly.currentValue === 'number' ? (
                <Tag 
                  color={poly.color} 
                  style={{
                    borderRadius: '6px',
                    fontWeight: '500',
                    fontSize: '12px'
                  }}
                >
                  {`${poly.dataSource.field}: ${poly.currentValue.toFixed(2)}`}
                </Tag>
             ) : (
                <Tag style={{
                  borderRadius: '6px',
                  fontWeight: '500',
                  fontSize: '12px',
                  background: '#f0f0f0',
                  color: '#666'
                }}>
                  No data
                </Tag>
             )}
           </Card>
        ))}
      </div>

      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #e8e8e8, transparent)',
        margin: '20px 0'
      }} />

      {selectedPolygon ? (
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0'
        }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#2c3e50',
              fontSize: '18px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✏️ Edit: {selectedPolygon.name}
            </h3>
             <Input 
                value={selectedPolygon.name} 
                onChange={(e) => updatePolygonData(selectedPolygon.id, { name: e.target.value })}
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e8e8e8',
                  marginBottom: '20px'
                }}
                placeholder="Enter polygon name"
            />
            <h4 style={{
              margin: '0 0 15px 0',
              color: '#2c3e50',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🎨 Color Rules:
            </h4>
            <div style={{marginBottom: '15px'}}>
              {selectedPolygon.rules.map(rule => (
                  <div key={rule.id} style={{
                    marginBottom: '12px',
                    padding: '12px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e8e8e8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <span style={{fontWeight: '500', color: '#2c3e50'}}>
                          {`Value ${rule.operator} ${rule.value} →`}
                        </span>
                        <Tag 
                          color={rule.color} 
                          style={{
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '12px',
                            minWidth: '60px',
                            textAlign: 'center'
                          }}
                        >
                          {rule.color}
                        </Tag>
                      </div>
                      <Button 
                          size="small" 
                          style={{
                            borderRadius: '6px',
                            background: '#2c3e50',
                            border: 'none',
                            color: 'white',
                            fontWeight: '500'
                          }}
                          onClick={() => {
                              const updatedRules = selectedPolygon.rules.map(r => 
                                  r.id === rule.id ? { ...r, color: 'black' } : r
                              );
                              updatePolygonData(selectedPolygon.id, { rules: updatedRules });
                          }}
                      >
                          Set to Black
                      </Button>
                  </div>
              ))}
            </div>
            <Button 
                type="primary" 
                style={{
                  width: '100%',
                  height: '40px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
                onClick={() => {
                    const updatedRules = selectedPolygon.rules.map(rule => ({ ...rule, color: 'black' }));
                    updatePolygonData(selectedPolygon.id, { rules: updatedRules });
                }}
            >
                🎨 Set All Rules to Black
            </Button>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#666'
        }}>
          <div style={{fontSize: '48px', marginBottom: '15px'}}>📍</div>
          <div style={{fontSize: '16px', fontWeight: '500'}}>
            Select or draw a polygon to see details.
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;