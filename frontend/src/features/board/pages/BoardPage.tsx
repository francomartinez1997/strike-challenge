import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Box, Paper, Typography } from '@mui/material';
import BoardHeader from '../components/SearchInput';
import { useVulnerabilityStore } from '../store';
import { Vulnerability } from '../../../types/allTypes';
import VulnerabilityBoardCard from '../components/VulnerabilityBoardCard';
import CreateVulnerabilityModal from '../components/CreateVulnerabilityModal';

const statuses = ['PENDING_FIX', 'IN_PROGRESS', 'SOLVED', 'FALSE_POSITIVE'];

const BoardPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVulnerability, setEditingVulnerability] = useState<Vulnerability | null>(null);

  const handleOpenModal = (vuln: Vulnerability | null) => {
    setEditingVulnerability(vuln);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingVulnerability(null);
    setModalOpen(false);
  };

  const data = useVulnerabilityStore(state => state.vulnerabilities);
  const fetchVulnerabilities = useVulnerabilityStore(state => state.fetchVulnerabilities);
  const patchVulnerability = useVulnerabilityStore(state => state.patchVulnerability);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchVulnerabilities();
      } catch (error) {
        console.error('Error while fetching:', error);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const id = parseInt(draggableId);
    const newStatus = destination.droppableId;

    try {
      await patchVulnerability(id, { status: newStatus });
    } catch (error) {
      console.error('Error while updating status:', error);
    }
  };

  const pendingFix = data.filter(v => v.status === 'PENDING_FIX');
  const inProgress = data.filter(v => v.status === 'IN_PROGRESS');
  const solved = data.filter(v => v.status === 'SOLVED');
  const falsePositive = data.filter(v => v.status === 'FALSE_POSITIVE');

  const grouped: Record<string, Vulnerability[]> = {
    PENDING_FIX: pendingFix,
    IN_PROGRESS: inProgress,
    SOLVED: solved,
    FALSE_POSITIVE: falsePositive
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box display="flex" flexDirection="column" gap={3} height="100%">
        <BoardHeader />
        <Box display="flex" justifyContent="space-between" gap={2} width="100%" height="100%">
          {statuses.map(status => (
            <Droppable droppableId={status} key={status}>
              {provided => (
                <Paper
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  elevation={3}
                  sx={{ padding: 3, width: '100%' }}
                >
                  <Typography fontSize="1rem" fontWeight={600} color="secondary">
                    {status}
                  </Typography>

                  {grouped?.[status] &&
                    grouped[status].map((vuln, index) => (
                      <Draggable key={vuln.id} draggableId={vuln.id.toString()} index={index}>
                        {provided => (
                          <VulnerabilityBoardCard
                            onClick={() => handleOpenModal(vuln)}
                            vulnerability={vuln}
                            provided={provided}
                          />
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          ))}
        </Box>
      </Box>
      <CreateVulnerabilityModal
        open={modalOpen}
        handleClose={handleCloseModal}
        vulnerability={editingVulnerability}
      />
    </DragDropContext>
  );
};

export default BoardPage;
