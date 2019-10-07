import React from 'react';
import withStore from '~/hocs/withStore';
import styles from './index.module.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class NotificationsComponent extends React.Component{
    render(){
        const { notifications: NotificationsStore } = this.props.store;

        const notifications = NotificationsStore.notificationsList.map((notification) => {
            return (
            <CSSTransition key={notification.id} 
                           classNames={{
                             enter: styles.itemEnter,
                             enterActive: styles.itemEnterActive,
                             exitActive: styles.itemLeaveActive
                           }}
                           timeout={500}
            >
                <div className={styles.item} onDoubleClick={() => {NotificationsStore.removeNotification(notification.id)}}>
                    {notification.message}
                </div>
            </CSSTransition>
            );
        });

        return (
            <TransitionGroup className={styles.box}>
                {notifications}
            </TransitionGroup>
        );
    }
}

export default withStore(NotificationsComponent);