import { colors } from '@/lib/colors';
import React from 'react';
import {
  Text,
  ViewStyle,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

export const Title = ({ children }: { children: React.ReactNode }) => {
  return <Text style={style.Title}>{children}</Text>;
};

export const MinTitle = ({ children }: { children: React.ReactNode }) => {
  return <Text style={style.MinTitle}>{children}</Text>;
};

export const Texts = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.Text}>{children}</Text>
);

export const SmallText = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.smallText}>{children}</Text>
);

export const HeaderText = ({ children }: { children: React.ReactNode }) => {
  <Text>{children}</Text>;
};

export const SubTitle = ({ children }: { children: React.ReactNode }) => {
  return <Text style={style.SubTitle}>{children}</Text>;
};

export const SubTitles = ({ children }: { children: React.ReactNode }) => {
  return <Text style={style.SubTitles}>{children}</Text>;
};

export const Card = ({ children }: { children: React.ReactNode }) => (
  <View style={style.Card}>{children}</View>
);

export const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={style.Wrapper}>{children}</View>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.CardTitle}>{children}</Text>
);

export const CardText = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.CardText}>{children}</Text>
);

export const CardAmount = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.cardAmount}>{children}</Text>
);

export const MinCard = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: ViewStyle;
}) => <View style={style}>{children}</View>;

export const ButtonFlex = ({ children }: { children: React.ReactNode }) => (
  <View style={style.ButtonRow}>{children}</View>
);

export const BtnFlex = ({ children }: { children: React.ReactNode }) => (
  <View style={style.ButtonFlex}>{children}</View>
);

export const RescheduleBtn = ({
  children,
  _fn,
}: {
  children: React.ReactNode;
  _fn: () => void;
}) => (
  <TouchableOpacity style={style.rescheduleBtn} onPress={_fn}>
    <Text style={[style.buttonText, { color: '#252B37' }]}>{children}</Text>
  </TouchableOpacity>
);

export const JoinBtn = ({
  children,
  _fn,
}: {
  children: React.ReactNode;
  _fn: () => void;
}) => (
  <TouchableOpacity style={style.joinBtn} onPress={_fn}>
    <Text style={[style.buttonText, { color: 'white' }]}>{children}</Text>
  </TouchableOpacity>
);

export const ButtonRow = () => (
  <TouchableOpacity style={style.rescheduleBtn}>
    <Text style={[style.buttonText, { color: '#252B37' }]}>Reschedule</Text>
  </TouchableOpacity>
);

export const DetailsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => <View style={style.container}>{children}</View>;
export const Status = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.status}>{children} </Text>
);

export const SubmitButton = ({
  children,
  _fn,
}: {
  children: React.ReactNode;
  _fn: () => void;
}) => (
  <TouchableOpacity style={style.closeBtn} onPress={_fn}>
    <Text style={style.closeBtnText}>{children}</Text>
  </TouchableOpacity>
);

export const LatoText = ({ children }: { children: React.ReactNode }) => (
  <Text style={style.latoText}>{children} </Text>
);

export const style = StyleSheet.create({
  Title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3,
    color: colors.black,
    // backgroundColor: 'red',
    fontFamily: 'LibreFranklin_600SemiBold',
    // fontStyle: 'italic'
  },
  MinTitle: {
    fontSize: 18,
    fontWeight: '600',
    // marginBottom: 5,
    fontFamily: 'LibreFranklin_600SemiBold',
  },
  Wrapper: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 15,
    color: '#414651',
    paddingBottom: 20,
    paddingTop: 10,
  },
  Text: {
    fontFamily: 'Libre-Franklin',
    fontSize: 14,
    color: '#717680',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  smallText: {
    fontFamily: 'Libre-Franklin',
    fontSize: 12,
    color: '#717680',
    fontStyle: 'normal',
    fontWeight: 400,
  },
  SubTitles: {
    fontFamily: 'Libre-Franklin',
    fontSize: 14,
    color: '#414651',
    fontStyle: 'normal',
    fontWeight: 500,
    marginBottom: 10,
    marginTop: 10,
  },
  SubTitle: {
    fontFamily: 'LibreFranklin_600SemiBold',
    fontSize: 14,
    color: '#414651',
    fontWeight: 600,
  },
  CardTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#414651',
    fontStyle: 'normal',
    fontWeight: 400,
    // backgroundColor: 'red'
  },
  CardText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: '#717680',
    fontWeight: 400,
  },
  Card: {
    padding: 15,
    borderColor: '#F2F2F2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',

  },
  ButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    gap: 10,
    borderTopColor: '#F8F8F8',
    borderTopWidth: 2,
    marginTop: 15,
  },
  ButtonFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 45,
  },
  rescheduleBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    borderColor: '#D6D7DA',
    borderWidth: 1,
    alignItems: 'center',
  },
  joinBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#DD2591',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Inter_600SemiBold',
  },
  status: {
    color: '#5924DC',
    backgroundColor: '#F4F3FF',
    borderRadius: 10,
    padding: 10,
    fontWeight: 500,
    fontSize: 12,
    textAlign: 'center',
    height: 30,
    fontFamily: 'Inter_500Medium',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 600,
    fontFamily: 'LibreFranklin_600SemiBold',
    paddingVertical: 4,
    color: colors.black,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 5,
    flex: 1,
  },
  closeBtn: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#DD2590',
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 30,
    marginBottom: 20,
  },
  closeBtnText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  latoText: {
    fontFamily: 'Lato_400Regular',
    fontWeight: '400',
    color: colors.lightBlack,
    marginBottom: 10,
    marginTop: 20,
  },
});
