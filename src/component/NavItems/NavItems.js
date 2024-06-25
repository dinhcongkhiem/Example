import classNames from "classnames/bind";
import styles from './NavItems.module.scss'
import Tippy from "@tippyjs/react/headless";
import { useSpring, motion } from "framer-motion";
const cx = classNames.bind(styles);
function NavItem({ items }) {
    const springConfig = { damping: 15, stiffness: 300 };
    const opacity = useSpring(0, springConfig);

    function onMount() {
        opacity.set(1);
    }

    function onHide() {
        opacity.set(0);
    }
    return (
        <div className={cx('wrapper')}>
            {
                items.subItem != undefined ?
                    <Tippy
                        interactive
                        placement="right-start"
                        animation={true}
                        onMount={onMount}
                        onHide={onHide}
                        render={(attrs) => (
                            <motion.ul style={{ opacity }} className={cx('sub-menu')} {...attrs}>
                                <div className={cx('arrow')}></div>
                                {items.subItem.map((subItem, index) => (
                                    <NavItem items={subItem} key={index} />
                                ))}

                            </motion.ul>
                        )}>
                        <li>
                            <a
                                href=""
                                className={cx('title')}>
                                {items.title}
                            </a>
                        </li>
                    </Tippy>
                    : <li>
                        <a href="" className={cx('title')}>{items.title}</a>
                    </li>

            }
        </div>
    );
}

export default NavItem;

