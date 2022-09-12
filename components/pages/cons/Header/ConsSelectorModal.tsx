import React from 'react';
import styled from 'styled-components';
import {
  Box,
  IconButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  keyframes,
} from '@opub-cdl/design-system';
import { Cross, IconDropdown, LokSabha, VidhanSabha } from 'components/icons';
import StateTab from './StateTab';
import { swrFetch } from 'utils/helper';
import { consListFetch } from 'utils/fetch';

const ConsSelectorModal = () => {
  const { data, isLoading } = swrFetch(`/constList`, consListFetch);
  return (
    <Wrapper>
      {!isLoading && (
        <Dialog>
          <StyledDialogTrigger asChild>
            <IconButton aria-label="Open dialog" size="2">
              <IconDropdown width={32} />
            </IconButton>
          </StyledDialogTrigger>

          <StyledDialogContent>
            <StyledDialogTitle>
              Select Constituency
              <StyledDialogClose asChild>
                <button>
                  Close
                  <Box css={{ display: 'flex', marginBottom: '-2px' }}>
                    <Cross />
                  </Box>
                </button>
              </StyledDialogClose>
            </StyledDialogTitle>
            <Content>
              <Tabs defaultValue="lok">
                <TabsList>
                  <SabhaSelector>
                    <span>States</span>
                    <div>
                      <TabsTrigger value="lok">
                        <Box>{<LokSabha width={24} />}</Box> Lok Sabha
                      </TabsTrigger>
                      <TabsTrigger value="vidhan">
                        <Box>{<VidhanSabha width={24} />}</Box> Vidhan Sabha
                      </TabsTrigger>
                    </div>
                  </SabhaSelector>
                </TabsList>
                <TabsContent value="lok">
                  <StateTab data={data.lok} sabha="lok" />
                </TabsContent>
                <TabsContent value="vidhan">
                  <StateTab data={data.vidhan} sabha="vidhan" />
                </TabsContent>
              </Tabs>
            </Content>
          </StyledDialogContent>
        </Dialog>
      )}
    </Wrapper>
  );
};

export default ConsSelectorModal;

const Wrapper = styled.div`
  line-height: 0;
`;

const StyledDialogTrigger = styled(DialogTrigger)`
  padding: 0;
  svg {
    fill: #888f8b;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: var(--border-1);
`;

const StyledDialogClose = styled(DialogClose)`
  color: var(--color-error);
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  text-decoration: underline;

  svg {
    fill: var(--color-error);
  }
`;

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-52%, -52%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledDialogContent = styled(DialogContent)`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90vw;
  max-width: 548px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) !important;

  filter: drop-shadow(var(--box-shadow-1));
  background-color: var(--color-background-light);
  border-radius: 4px;
  border: var(--border-1);
  padding: 20px 24px 24px;
`;

const Content = styled.div`
  margin-top: 16px;
`;

const SabhaSelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-background-lighter);
  padding: 16px 16px 0;
  border-radius: 2px;
  border-bottom: var(--border-1);
  width: 100%;

  > span {
    font-weight: 600;
    color: var(--text-light-light);
    padding-bottom: 16px;
  }

  > div {
    display: flex;
    gap: 16px;
  }

  button {
    font-weight: 600;
    padding: 0 10px 16px;
    color: var(--text-light-medium);
    gap: 8px;
    flex: unset;
    cursor: pointer;
    border-bottom: 2px solid transparent;

    > div {
      line-height: 0;
    }

    svg {
      fill: var(--color-grey-300);
    }

    &[data-state='active'] {
      color: var(--color-amazon-300);
      border-color: var(--color-amazon-300);

      svg {
        fill: var(--color-amazon-300);
      }
    }
  }
`;
