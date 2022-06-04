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
import { HomeScreen } from '../Screens/HomeScreen';
import {
  seedConditionsHelper,
  seedBodyStylesHelper,
  seedCarLevelsHelper,
  seedCarMakesHelper,
  seedColorsHelper,
  seedFuelTypesHelper,
  seedExtrasHelper,
  seedTunningsHelper,
} from '../Utils/dataSeeder';
import { useState } from 'react';
import { CreateColorScreen } from '../Screens/Create/CreateColorScreen';
import { CreateFuelTypeScreen } from '../Screens/Create/CreateFuelTypeScreen';
import { CreateConditionScreen } from '../Screens/Create/CreateConditionScreen';
import { CreateCarLevelScreen } from '../Screens/Create/CreateCarLevelScreen';
import { CreateCarMakeScreen } from '../Screens/Create/CreateCarMakeScreen';
import { CreateBodyStyleScreen } from '../Screens/Create/CreateBodyStyleScreen';
import { UpdateColorScreen } from '../Screens/Update/UpdateColorScreen';
import { UpdateBodyStyleScreen } from '../Screens/Update/UpdateVodyStyleScreen';
import { UpdateConditionScreen } from '../Screens/Update/UpdateConditionScreen';
import { UpdateFuelTypeScreen } from '../Screens/Update/UpdateFuelTypeScreen';
import { UpdateCarMakeScreen } from '../Screens/Update/UpdateCarMakeScreen';
import { SelectBodyStyleScreen } from '../Screens/Select/SelectBodyStyleScreen';
import { SelectCarMakeScreen } from '../Screens/Select/SelectCarMakeScreen';
import { SelectCarLevelScreen } from '../Screens/Select/SelectCarLevelScreen';
import { SelectConditionScreen } from '../Screens/Select/SelectConditionScreen';
import { SelectColorScreen } from '../Screens/Select/SelectColorScreen';
import { SelectFuelTypeScreen } from '../Screens/Select/SelectFuelTypeScreen';
import { UpdateCarLevelScreen } from '../Screens/Update/UpdateCarLevelScreen';
import { CreateExtraScreen } from '../Screens/Create/CreateExtraScreen';
import { CreateTunningScreen } from '../Screens/View/CreateTunningScreen';
import { UpdateExtraScreen } from '../Screens/Update/UpdateExtraScreen';
import { UpdateTunningScreen } from '../Screens/Update/UpdateTunningScreen';
import { SelectExtraScreen } from '../Screens/Select/SelectExtraScreen';
import { SelectTunningScreen } from '../Screens/Select/SelectTunningScreen';
import { CreateCarScreen } from '../Screens/Create/CreateCarScreen';
import { UpdateCarScreen } from '../Screens/Update/UpdateCarScreen';
import { SelectCarScreen } from '../Screens/Select/SelectCarScreen';
import { UpdateCarExtrasScreen } from '../Screens/Update/UpdateCarExtrasScreen';
import { UpdateCarTunningsScreen } from '../Screens/Update/UpdateCarTunningsScreen';

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

  const [isCreateColorVisible, setIsCreateColorVisible] = useState(false);
  const [isCreateCarMakeVisible, setIsCreateCarMakeVisible] = useState(false);
  const [isCreateCarLevelVisible, setIsCreateCarLevelVisible] = useState(false);
  const [isCreateConditionVisible, setIsCreateConditionVisible] = useState(false);
  const [isCreateFuelTypeVisible, setIsCreateFuelTypeVisible] = useState(false);
  const [isCreateBodyStyleVisible, setIsCreateBodyStyleVisible] = useState(false);
  const [isCreateExtraVisible, setIsCreateExtraVisible] = useState(false);
  const [isCreateTunningVisible, setIsCreateTunningVisible] = useState(false);
  const [isCreateCarVisible, setIsCreateCarVisible] = useState(false);

  const [isUpdateColorVisible, setIsUpdateColorVisible] = useState(false);
  const [isUpdateCarMakeVisible, setIsUpdateCarMakeVisible] = useState(false);
  const [isUpdateCarLevelVisible, setIsUpdateCarLevelVisible] = useState(false);
  const [isUpdateConditionVisible, setIsUpdateConditionVisible] = useState(false);
  const [isUpdateFuelTypeVisible, setIsUpdateFuelTypeVisible] = useState(false);
  const [isUpdateBodyStyleVisible, setIsUpdateBodyStyleVisible] = useState(false);
  const [isUpdateExtraVisible, setIsUpdateExtraVisible] = useState(false);
  const [isUpdateTunningVisible, setIsUpdateTunningVisible] = useState(false);
  const [isUpdateCarVisible, setIsUpdateCarVisible] = useState(false);
  const [isUpdateCarExtrasVisible, setIsUpdateCarExtrasVisible] = useState(false);
  const [isUpdateCarTunningsVisible, setIsUpdateCarTunningsVisible] = useState(false);

  const [isSelectColorVisible, setIsSelectColorVisible] = useState(false);
  const [isSelectCarMakeVisible, setIsSelectCarMakeVisible] = useState(false);
  const [isSelectCarLevelVisible, setIsSelectCarLevelVisible] = useState(false);
  const [isSelectConditionVisible, setIsSelectConditionVisible] = useState(false);
  const [isSelectFuelTypeVisible, setIsSelectFuelTypeVisible] = useState(false);
  const [isSelectBodyStyleVisible, setIsSelectBodyStyleVisible] = useState(false);
  const [isSelectExtraVisible, setIsSelectExtraVisible] = useState(false);
  const [isSelectTunningVisible, setIsSelectTunningVisible] = useState(false);
  const [isSelectCarVisible, setIsSelectCarVisible] = useState(false);

  const [colorId, setColorId] = useState<number>(0);
  const [carMakeId, setCarMakeId] = useState<number>(0);
  const [carLevelId, setCarLevelId] = useState<number>(0);
  const [conditionId, setConditionId] = useState<number>(0);
  const [fuelTypeId, setFuelTypeId] = useState<number>(0);
  const [bodyStyleId, setBodyStyleId] = useState<number>(0);
  const [extraId, setExtraId] = useState<number>(0);
  const [tunningId, setTunningId] = useState<number>(0);
  const [carId, setCarId] = useState<number>(0);

  const [selectedColorAction, setSelectedColorAction] = useState<string>('None');
  const [selectedBodyStyleAction, setSelectedBodyStyleAction] = useState<string>('None');
  const [selectedCarMakeAction, setSelectedCarMakeAction] = useState<string>('None');
  const [selectedCarLevelAction, setSelectedCarLevelAction] = useState<string>('None');
  const [selectedFuelTypeAction, setSelectedFuelTypeAction] = useState<string>('None');
  const [selectedConditionAction, setSelectedConditionAction] = useState<string>('None');
  const [selectedExtraAction, setSelectedExtraAction] = useState<string>('None');
  const [selectedTunningAction, setSelectedTunningAction] = useState<string>('None');
  const [selectedCarAction, setSelectedCarAction] = useState<string>('None');

  useEffect(() => {
    if (selectedColorAction === 'Update') {
      setIsUpdateColorVisible(true);
    }

    setIsSelectColorVisible(false);
  }, [colorId]);

  useEffect(() => {
    if (selectedCarMakeAction === 'Update') {
      setIsUpdateCarMakeVisible(true);
    }

    setIsSelectCarMakeVisible(false);
  }, [carMakeId]);

  useEffect(() => {
    if (selectedCarLevelAction === 'Update') {
      setIsUpdateCarLevelVisible(true);
    }

    setIsSelectCarLevelVisible(false);
  }, [carLevelId]);

  useEffect(() => {
    if (selectedConditionAction === 'Update') {
      setIsUpdateConditionVisible(true);
    }

    setIsSelectConditionVisible(false);
  }, [conditionId]);

  useEffect(() => {
    if (selectedFuelTypeAction === 'Update') {
      setIsUpdateFuelTypeVisible(true);
    }
    setIsSelectFuelTypeVisible(false);
  }, [fuelTypeId]);

  useEffect(() => {
    if (selectedBodyStyleAction === 'Update') {
      setIsUpdateBodyStyleVisible(true);
    }
    setIsSelectBodyStyleVisible(false);
  }, [bodyStyleId]);

  useEffect(() => {
    if (selectedExtraAction === 'Update') {
      setIsUpdateExtraVisible(true);
    }
    setIsSelectExtraVisible(false);
  }, [extraId]);

  useEffect(() => {
    if (selectedTunningAction === 'Update') {
      setIsUpdateTunningVisible(true);
    }
    setIsSelectTunningVisible(false);
  }, [tunningId]);

  useEffect(() => {
    if (selectedCarAction === 'Update') {
      setIsUpdateCarVisible(true);
    } else if (selectedCarAction === 'Extras') {
      setIsUpdateCarExtrasVisible(true);
    } else if (selectedCarAction === 'Tunnings') {
      setIsUpdateCarTunningsVisible(true);
    }
    setIsSelectCarVisible(false);
  }, [carId]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" selectedKeys={[selected]}>
          <Menu.Item key={nameof(HomeScreen)} onClick={() => history('/')}>
            Home
          </Menu.Item>
          <SubMenu key="Tables" icon={<BarChartOutlined />} title="Tables">
            <Menu.Item key="table:colors" onClick={() => history('/colors')}>
              Colors Table
            </Menu.Item>
            <Menu.Item key="table:carMakes" onClick={() => history('/carMakes')}>
              Car Makes Table
            </Menu.Item>
            <Menu.Item key="table:carLevels" onClick={() => history('/carLevels')}>
              Car Levels Table
            </Menu.Item>
            <Menu.Item key="table:bodyStyles" onClick={() => history('/bodyStyles')}>
              Body Styles Table
            </Menu.Item>
            <Menu.Item key="table:fuelTypes" onClick={() => history('/fuelTypes')}>
              Fuel Types Table
            </Menu.Item>
            <Menu.Item key="table:conditions" onClick={() => history('/conditions')}>
              Conditions Table
            </Menu.Item>
            <Menu.Item key="table:extras" onClick={() => history('/extras')}>
              Extras Table
            </Menu.Item>
            <Menu.Item key="table:tunnings" onClick={() => history('/tunnings')}>
              Tunnings Table
            </Menu.Item>
            <Menu.Item key="table:cars" onClick={() => history('/cars')}>
              Cars Table
            </Menu.Item>
          </SubMenu>
          {roles.includes('Administrator') && (
            <>
              <SubMenu key="Seeder" icon={<DatabaseOutlined />} title="Data Seeder">
                <Menu.Item key="seed:conditions" onClick={async () => await seedConditionsHelper()}>
                  Seed Conditions
                </Menu.Item>
                <Menu.Item key="seed:carMakes" onClick={async () => await seedCarMakesHelper()}>
                  Seed Car Makes
                </Menu.Item>
                <Menu.Item key="seed:carLevels" onClick={async () => await seedCarLevelsHelper()}>
                  Seed Car Levels
                </Menu.Item>
                <Menu.Item key="seed:bodyStyles" onClick={async () => await seedBodyStylesHelper()}>
                  Seed Body Styles
                </Menu.Item>
                <Menu.Item key="seed:colors" onClick={async () => await seedColorsHelper()}>
                  Seed Colors
                </Menu.Item>
                <Menu.Item key="seed:fuelTypes" onClick={async () => await seedFuelTypesHelper()}>
                  Seed Fuel Types
                </Menu.Item>
                <Menu.Item key="seed:extras" onClick={async () => await seedExtrasHelper()}>
                  Seed Extras
                </Menu.Item>
                <Menu.Item key="seed:tunnings" onClick={async () => await seedTunningsHelper()}>
                  Seed Tunnings
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Create" icon={<DiffOutlined />} title="Create">
                <Menu.Item
                  key="form:createColor"
                  onClick={async () => setIsCreateColorVisible(true)}
                >
                  Create Color
                </Menu.Item>
                <Menu.Item
                  key="form:createFuelType"
                  onClick={async () => setIsCreateFuelTypeVisible(true)}
                >
                  Create Fuel Type
                </Menu.Item>
                <Menu.Item
                  key="form:createCondition"
                  onClick={async () => setIsCreateConditionVisible(true)}
                >
                  Create Condition
                </Menu.Item>
                <Menu.Item
                  key="form:createCarLevel"
                  onClick={async () => setIsCreateCarLevelVisible(true)}
                >
                  Create Car Level
                </Menu.Item>
                <Menu.Item
                  key="form:createCarMake"
                  onClick={async () => setIsCreateCarMakeVisible(true)}
                >
                  Create Car Make
                </Menu.Item>
                <Menu.Item
                  key="form:createBodyStyle"
                  onClick={async () => setIsCreateBodyStyleVisible(true)}
                >
                  Create Body Style
                </Menu.Item>
                <Menu.Item
                  key="form:createExtra"
                  onClick={async () => setIsCreateExtraVisible(true)}
                >
                  Create Extra
                </Menu.Item>
                <Menu.Item
                  key="form:createTunning"
                  onClick={async () => setIsCreateTunningVisible(true)}
                >
                  Create Tunning
                </Menu.Item>
                <Menu.Item key="form:createCar" onClick={async () => setIsCreateCarVisible(true)}>
                  Create Car
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Update" icon={<EditOutlined />} title="Update">
                <Menu.Item
                  key="form:updateColor"
                  onClick={async () => {
                    setIsSelectColorVisible(true);
                    setSelectedColorAction('Update');
                  }}
                >
                  Update Color
                </Menu.Item>
                <Menu.Item
                  key="form:updateFuelType"
                  onClick={async () => {
                    setIsSelectFuelTypeVisible(true);
                    setSelectedFuelTypeAction('Update');
                  }}
                >
                  Update Fuel Type
                </Menu.Item>
                <Menu.Item
                  key="form:updateCondition"
                  onClick={async () => {
                    setIsSelectConditionVisible(true);
                    setSelectedConditionAction('Update');
                  }}
                >
                  Update Condition
                </Menu.Item>
                <Menu.Item
                  key="form:updateCarLevel"
                  onClick={async () => {
                    setIsSelectCarLevelVisible(true);
                    setSelectedCarLevelAction('Update');
                  }}
                >
                  Update Car Level
                </Menu.Item>
                <Menu.Item
                  key="form:updateCarMake"
                  onClick={async () => {
                    setIsSelectCarMakeVisible(true);
                    setSelectedCarMakeAction('Update');
                  }}
                >
                  Update Car Make
                </Menu.Item>
                <Menu.Item
                  key="form:updateBodyStyle"
                  onClick={async () => {
                    setIsSelectBodyStyleVisible(true);
                    setSelectedBodyStyleAction('Update');
                  }}
                >
                  Update Body Style
                </Menu.Item>
                <Menu.Item
                  key="form:updateExtra"
                  onClick={async () => {
                    setIsSelectExtraVisible(true);
                    setSelectedExtraAction('Update');
                  }}
                >
                  Update Extra
                </Menu.Item>
                <Menu.Item
                  key="form:updateTunning"
                  onClick={async () => {
                    setIsSelectTunningVisible(true);
                    setSelectedTunningAction('Update');
                  }}
                >
                  Update Tunning
                </Menu.Item>
                <Menu.Item
                  key="form:updateCar"
                  onClick={async () => {
                    setIsSelectCarVisible(true);
                    setSelectedCarAction('Update');
                  }}
                >
                  Update Car
                </Menu.Item>
                <Menu.Item
                  key="form:updateCarExtras"
                  onClick={async () => {
                    setIsSelectCarVisible(true);
                    setSelectedCarAction('Extras');
                  }}
                >
                  Update Car Extras
                </Menu.Item>
                <Menu.Item
                  key="form:updateCarTunnings"
                  onClick={async () => {
                    setIsSelectCarVisible(true);
                    setSelectedCarAction('Tunnings');
                  }}
                >
                  Update Car Tunnings
                </Menu.Item>
              </SubMenu>
              <SubMenu key="Forms:Delete" icon={<DeleteOutlined />} title="Delete">
                <Menu.Item
                  key="form:deleteColor"
                  onClick={async () => {
                    setIsSelectColorVisible(true);
                    setSelectedColorAction('Delete');
                  }}
                >
                  Delete Color
                </Menu.Item>
                <Menu.Item
                  key="form:deleteFuelType"
                  onClick={async () => {
                    setIsSelectFuelTypeVisible(true);
                    setSelectedFuelTypeAction('Delete');
                  }}
                >
                  Delete Fuel Type
                </Menu.Item>
                <Menu.Item
                  key="form:deleteCondition"
                  onClick={async () => {
                    setIsSelectConditionVisible(true);
                    setSelectedConditionAction('Delete');
                  }}
                >
                  Delete Condition
                </Menu.Item>
                <Menu.Item
                  key="form:deleteCarLevel"
                  onClick={async () => {
                    setIsSelectCarLevelVisible(true);
                    setSelectedCarLevelAction('Delete');
                  }}
                >
                  Delete Car Level
                </Menu.Item>
                <Menu.Item
                  key="form:deleteCarMake"
                  onClick={async () => {
                    setIsSelectCarMakeVisible(true);
                    setSelectedCarMakeAction('Delete');
                  }}
                >
                  Delete Car Make
                </Menu.Item>
                <Menu.Item
                  key="form:deleteBodyStyle"
                  onClick={async () => {
                    setIsSelectBodyStyleVisible(true);
                    setSelectedBodyStyleAction('Delete');
                  }}
                >
                  Delete Body Style
                </Menu.Item>
                <Menu.Item
                  key="form:deleteExtra"
                  onClick={async () => {
                    setIsSelectExtraVisible(true);
                    setSelectedExtraAction('Delete');
                  }}
                >
                  Delete Extra
                </Menu.Item>
                <Menu.Item
                  key="form:deleteTunning"
                  onClick={async () => {
                    setIsSelectTunningVisible(true);
                    setSelectedTunningAction('Delete');
                  }}
                >
                  Delete Tunning
                </Menu.Item>
                <Menu.Item
                  key="form:deleteCar"
                  onClick={async () => {
                    setIsSelectCarVisible(true);
                    setSelectedCarAction('Delete');
                  }}
                >
                  Delete Car
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
        <CreateColorScreen
          visible={isCreateColorVisible}
          setIsModalVisible={setIsCreateColorVisible}
        />
        <CreateFuelTypeScreen
          visible={isCreateFuelTypeVisible}
          setIsModalVisible={setIsCreateFuelTypeVisible}
        />
        <CreateConditionScreen
          visible={isCreateConditionVisible}
          setIsModalVisible={setIsCreateConditionVisible}
        />
        <CreateCarLevelScreen
          visible={isCreateCarLevelVisible}
          setIsModalVisible={setIsCreateCarLevelVisible}
        />
        <CreateCarMakeScreen
          visible={isCreateCarMakeVisible}
          setIsModalVisible={setIsCreateCarMakeVisible}
        />
        <CreateBodyStyleScreen
          visible={isCreateBodyStyleVisible}
          setIsModalVisible={setIsCreateBodyStyleVisible}
        />
        <CreateExtraScreen
          visible={isCreateExtraVisible}
          setIsModalVisible={setIsCreateExtraVisible}
        />
        <CreateTunningScreen
          visible={isCreateTunningVisible}
          setIsModalVisible={setIsCreateTunningVisible}
        />
        <CreateCarScreen visible={isCreateCarVisible} setIsModalVisible={setIsCreateCarVisible} />
        {colorId !== 0 && (
          <UpdateColorScreen
            visible={isUpdateColorVisible}
            setIsModalVisible={setIsUpdateColorVisible}
            id={colorId}
          />
        )}
        {bodyStyleId !== 0 && (
          <UpdateBodyStyleScreen
            visible={isUpdateBodyStyleVisible}
            setIsModalVisible={setIsUpdateBodyStyleVisible}
            id={bodyStyleId}
          />
        )}
        {conditionId !== 0 && (
          <UpdateConditionScreen
            visible={isUpdateConditionVisible}
            setIsModalVisible={setIsUpdateConditionVisible}
            id={conditionId}
          />
        )}
        {fuelTypeId !== 0 && (
          <UpdateFuelTypeScreen
            visible={isUpdateFuelTypeVisible}
            setIsModalVisible={setIsUpdateFuelTypeVisible}
            id={fuelTypeId}
          />
        )}
        {carMakeId !== 0 && (
          <UpdateCarMakeScreen
            visible={isUpdateCarMakeVisible}
            setIsModalVisible={setIsUpdateCarMakeVisible}
            id={carMakeId}
          />
        )}
        {carLevelId !== 0 && (
          <UpdateCarLevelScreen
            visible={isUpdateCarLevelVisible}
            setIsModalVisible={setIsUpdateCarLevelVisible}
            id={carLevelId}
          />
        )}
        {extraId !== 0 && (
          <UpdateExtraScreen
            visible={isUpdateExtraVisible}
            setIsModalVisible={setIsUpdateExtraVisible}
            id={extraId}
          />
        )}
        {tunningId !== 0 && (
          <UpdateTunningScreen
            visible={isUpdateTunningVisible}
            setIsModalVisible={setIsUpdateTunningVisible}
            id={tunningId}
          />
        )}
        {carId !== 0 && (
          <UpdateCarScreen
            visible={isUpdateCarVisible}
            setIsModalVisible={setIsUpdateCarVisible}
            id={carId}
          />
        )}
        {carId !== 0 && (
          <UpdateCarExtrasScreen
            visible={isUpdateCarExtrasVisible}
            setIsModalVisible={setIsUpdateCarExtrasVisible}
            id={carId}
          />
        )}
        {carId !== 0 && (
          <UpdateCarTunningsScreen
            visible={isUpdateCarTunningsVisible}
            setIsModalVisible={setIsUpdateCarTunningsVisible}
            id={carId}
          />
        )}
        <SelectBodyStyleScreen
          visible={isSelectBodyStyleVisible}
          setIsModalVisible={setIsSelectBodyStyleVisible}
          setId={setBodyStyleId}
          action={selectedBodyStyleAction}
        />
        <SelectCarMakeScreen
          visible={isSelectCarMakeVisible}
          setIsModalVisible={setIsSelectCarMakeVisible}
          setId={setCarMakeId}
          action={selectedCarMakeAction}
        />
        <SelectCarLevelScreen
          visible={isSelectCarLevelVisible}
          setIsModalVisible={setIsSelectCarLevelVisible}
          setId={setCarLevelId}
          action={selectedCarLevelAction}
        />
        <SelectConditionScreen
          visible={isSelectConditionVisible}
          setIsModalVisible={setIsSelectConditionVisible}
          setId={setConditionId}
          action={selectedConditionAction}
        />
        <SelectColorScreen
          visible={isSelectColorVisible}
          setIsModalVisible={setIsSelectColorVisible}
          setId={setColorId}
          action={selectedColorAction}
        />
        <SelectFuelTypeScreen
          visible={isSelectFuelTypeVisible}
          setIsModalVisible={setIsSelectFuelTypeVisible}
          setId={setFuelTypeId}
          action={selectedFuelTypeAction}
        />
        <SelectExtraScreen
          visible={isSelectExtraVisible}
          setIsModalVisible={setIsSelectExtraVisible}
          setId={setExtraId}
          action={selectedExtraAction}
        />
        <SelectTunningScreen
          visible={isSelectTunningVisible}
          setIsModalVisible={setIsSelectTunningVisible}
          setId={setTunningId}
          action={selectedTunningAction}
        />
        <SelectCarScreen
          visible={isSelectCarVisible}
          setIsModalVisible={setIsSelectCarVisible}
          setId={setCarId}
          action={selectedCarAction}
        />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Auto Repait ©2022 Created by Dimitur K. and Atanas A.
      </Footer>
    </Layout>
  );
};
