import React from 'react';
import { Layout, Menu } from 'antd';
import {
  BarChartOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  DiffOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { getUserRoles, isAuthenticated, logOut } from '../Utils/authentication';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { nameof } from 'ts-simple-nameof';
import {
  seedAnimalsHelper,
  seedCagesHelper,
  seedFoodsHelper,
  seedEventsHelper,
  seedAllDataHelper,
  resetDatabaseHelper,
} from '../Utils/dataSeeder';
import { useState } from 'react';
import { AnimalScreen } from '../Screens/AnimalScreen';
import { CageScreen } from '../Screens/CageScreen';
import { FoodScreen } from '../Screens/FoodScreen';
import { CreateAnimalScreen } from '../Screens/Create/CreateAnimalScreen';
import { CreateCageScreen } from '../Screens/Create/CreateCageScreen';
import { CreateFoodScreen } from '../Screens/Create/CreateFoodScreen';
import { CreateEventScreen } from '../Screens/Create/CreateEventScreen';
import { UpdateAnimalScreen } from '../Screens/Update/UpdateAnimalScreen';
import { UpdateCageScreen } from '../Screens/Update/UpdateCageScreen';
import { UpdateFoodScreen } from '../Screens/Update/UpdateFoodScreen';
import { UpdateEventScreen } from '../Screens/Update/UpdateEventScreen';
import { SelectAnimalScreen } from '../Screens/Select/SelectAnimalScreen';
import { SelectCageScreen } from '../Screens/Select/SelectCageScreen';
import { SelectFoodScreen } from '../Screens/Select/SelectFoodScreen';
import { SelectEventScreen } from '../Screens/Select/SelectEventScreen';

const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;

export const Navigation = (props: { content: React.ReactNode; selected: string }) => {
  const history = useNavigate();
  useEffect(() => {
    if (!isAuthenticated()) {
      history('/login');
    }
  });

  const { content, selected } = props;
  const roles = getUserRoles();

  const [isCreateAnimalVisible, setIsCreateAnimalVisible] = useState(false);
  const [isCreateCageVisible, setIsCreateCageVisible] = useState(false);
  const [isCreateFoodVisible, setIsCreateFoodVisible] = useState(false);
  const [isCreateEventVisible, setIsCreateEventVisible] = useState(false);

  const [isUpdateAnimalVisible, setIsUpdateAnimalVisible] = useState(false);
  const [isUpdateCageVisible, setIsUpdateCageVisible] = useState(false);
  const [isUpdateFoodVisible, setIsUpdateFoodVisible] = useState(false);
  const [isUpdateEventVisible, setIsUpdateEventVisible] = useState(false);

  const [isSelectAnimalVisible, setIsSelectAnimalVisible] = useState(false);
  const [isSelectCageVisible, setIsSelectCageVisible] = useState(false);
  const [isSelectFoodVisible, setIsSelectFoodVisible] = useState(false);
  const [isSelectEventVisible, setIsSelectEventVisible] = useState(false);

  const [animalId, setAnimalId] = useState<number>(0);
  const [cageId, setCageId] = useState<number>(0);
  const [foodId, setFoodId] = useState<number>(0);
  const [eventId, setEventId] = useState<number>(0);

  const [selectedAnimalAction, setSelectedAnimalAction] = useState<string>('None');
  const [selectedCageAction, setSelectedCageAction] = useState<string>('None');
  const [selectedFoodAction, setSelectedFoodAction] = useState<string>('None');
  const [selectedEventAction, setSelectedEventAction] = useState<string>('None');

  useEffect(() => {
    if (selectedAnimalAction === 'Update') {
      setIsUpdateAnimalVisible(true);
    }

    setIsSelectAnimalVisible(false);
  }, [animalId]);

  useEffect(() => {
    if (selectedCageAction === 'Update') {
      setIsUpdateCageVisible(true);
    }

    setIsSelectCageVisible(false);
  }, [cageId]);

  useEffect(() => {
    if (selectedFoodAction === 'Update') {
      setIsUpdateFoodVisible(true);
    }

    setIsSelectFoodVisible(false);
  }, [foodId]);

  useEffect(() => {
    if (selectedEventAction === 'Update') {
      setIsUpdateEventVisible(true);
    }

    setIsSelectEventVisible(false);
  }, [eventId]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selected]}>
          <Menu.Item key={nameof(AnimalScreen)} onClick={() => history('/home/animals')}>
            Animals
          </Menu.Item>
          <Menu.Item key={nameof(CageScreen)} onClick={() => history('/home/cages')}>
            Cages
          </Menu.Item>
          <Menu.Item key={nameof(FoodScreen)} onClick={() => history('/home/foods')}>
            Foods
          </Menu.Item>
          <SubMenu key="Tables" icon={<BarChartOutlined />} title="Tables">
            <Menu.Item key="table:animals" onClick={() => history('/animals')}>
              Animals Table
            </Menu.Item>
            <Menu.Item key="table:cages" onClick={() => history('/cages')}>
              Cages Table
            </Menu.Item>
            <Menu.Item key="table:events" onClick={() => history('/events')}>
              Events Table
            </Menu.Item>
            <Menu.Item key="table:foods" onClick={() => history('/foods')}>
              Foods Table
            </Menu.Item>
          </SubMenu>
          {roles.includes('Administrator') && (
            <>
              <SubMenu key="Seeder" icon={<DatabaseOutlined />} title="Data Seeder">
                <Menu.Item key="seed:animals" onClick={async () => await seedAnimalsHelper()}>
                  Seed Animals
                </Menu.Item>
                <Menu.Item key="seed:cages" onClick={async () => await seedCagesHelper()}>
                  Seed Cages
                </Menu.Item>
                <Menu.Item key="seed:foods" onClick={async () => await seedFoodsHelper()}>
                  Seed Foods
                </Menu.Item>
                <Menu.Item key="seed:events" onClick={async () => await seedEventsHelper()}>
                  Seed Events
                </Menu.Item>
                <Menu.Item key="seed:all" onClick={async () => await seedAllDataHelper()}>
                  Seed All Data
                </Menu.Item>
                <Menu.Item key="seed:reset" onClick={async () => await resetDatabaseHelper()}>
                  Reset Database
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Create" icon={<DiffOutlined />} title="Create">
                <Menu.Item
                  key="form:createAnimal"
                  onClick={async () => setIsCreateAnimalVisible(true)}
                >
                  Create Animal
                </Menu.Item>
                <Menu.Item key="form:createCage" onClick={async () => setIsCreateCageVisible(true)}>
                  Create Cage
                </Menu.Item>
                <Menu.Item key="form:createFood" onClick={async () => setIsCreateFoodVisible(true)}>
                  Create Food
                </Menu.Item>
                <Menu.Item
                  key="form:createEvent"
                  onClick={async () => setIsCreateEventVisible(true)}
                >
                  Create Event
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Update" icon={<EditOutlined />} title="Update">
                <Menu.Item
                  key="form:updateAnimal"
                  onClick={async () => {
                    setIsSelectAnimalVisible(true);
                    setSelectedAnimalAction('Update');
                  }}
                >
                  Update Animal
                </Menu.Item>
                <Menu.Item
                  key="form:updateCage"
                  onClick={async () => {
                    setIsSelectCageVisible(true);
                    setSelectedCageAction('Update');
                  }}
                >
                  Update Cage
                </Menu.Item>
                <Menu.Item
                  key="form:updateFood"
                  onClick={async () => {
                    setIsSelectFoodVisible(true);
                    setSelectedFoodAction('Update');
                  }}
                >
                  Update Food
                </Menu.Item>
                <Menu.Item
                  key="form:updateEvent"
                  onClick={async () => {
                    setIsSelectEventVisible(true);
                    setSelectedEventAction('Update');
                  }}
                >
                  Update Event
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Delete" icon={<DeleteOutlined />} title="Delete">
                <Menu.Item
                  key="form:deleteAnimal"
                  onClick={async () => {
                    setIsSelectAnimalVisible(true);
                    setSelectedAnimalAction('Delete');
                  }}
                >
                  Delete Animal
                </Menu.Item>
                <Menu.Item
                  key="form:deleteCage"
                  onClick={async () => {
                    setIsSelectCageVisible(true);
                    setSelectedCageAction('Delete');
                  }}
                >
                  Delete Cage
                </Menu.Item>
                <Menu.Item
                  key="form:deleteFood"
                  onClick={async () => {
                    setIsSelectFoodVisible(true);
                    setSelectedFoodAction('Delete');
                  }}
                >
                  Delete Food
                </Menu.Item>
                <Menu.Item
                  key="form:deleteEvent"
                  onClick={async () => {
                    setIsSelectEventVisible(true);
                    setSelectedEventAction('Delete');
                  }}
                >
                  Delete Event
                </Menu.Item>
              </SubMenu>
            </>
          )}
          <Menu.Item style={{ marginLeft: 'auto' }} onClick={() => logOut(history)} key="Logout">
            Logout
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
          {content}
        </Layout>
        <CreateAnimalScreen
          visible={isCreateAnimalVisible}
          setIsModalVisible={setIsCreateAnimalVisible}
        />
        <CreateCageScreen
          visible={isCreateCageVisible}
          setIsModalVisible={setIsCreateCageVisible}
        />
        <CreateFoodScreen
          visible={isCreateFoodVisible}
          setIsModalVisible={setIsCreateFoodVisible}
        />
        <CreateEventScreen
          visible={isCreateEventVisible}
          setIsModalVisible={setIsCreateEventVisible}
        />
        {animalId !== 0 && (
          <UpdateAnimalScreen
            visible={isUpdateAnimalVisible}
            setIsModalVisible={setIsUpdateAnimalVisible}
            id={animalId}
          />
        )}
        {cageId !== 0 && (
          <UpdateCageScreen
            visible={isUpdateCageVisible}
            setIsModalVisible={setIsUpdateCageVisible}
            id={cageId}
          />
        )}
        {foodId !== 0 && (
          <UpdateFoodScreen
            visible={isUpdateFoodVisible}
            setIsModalVisible={setIsUpdateFoodVisible}
            id={foodId}
          />
        )}
        {eventId !== 0 && (
          <UpdateEventScreen
            visible={isUpdateEventVisible}
            setIsModalVisible={setIsUpdateEventVisible}
            id={eventId}
          />
        )}
        <SelectAnimalScreen
          visible={isSelectAnimalVisible}
          setIsModalVisible={setIsSelectAnimalVisible}
          setId={setAnimalId}
          action={selectedAnimalAction}
        />
        <SelectCageScreen
          visible={isSelectCageVisible}
          setIsModalVisible={setIsSelectCageVisible}
          setId={setCageId}
          action={selectedCageAction}
        />
        <SelectFoodScreen
          visible={isSelectFoodVisible}
          setIsModalVisible={setIsSelectFoodVisible}
          setId={setFoodId}
          action={selectedFoodAction}
        />
        <SelectEventScreen
          visible={isSelectEventVisible}
          setIsModalVisible={setIsSelectEventVisible}
          setId={setEventId}
          action={selectedEventAction}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>Zoo Erp ©2022 Created by Dimitur Kazakov</Footer>
    </Layout>
  );
};
